/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommand', ceQuestionBCommand);

  ceQuestionBCommand.$inject = ['questionBService','movePieceService', 'readableLogService'];
  function ceQuestionBCommand(questionBService,movePieceService, readableLogService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBCommandDirective/ceQuestionBCommand.html',
      scope: {
        level: '@',
        from: '=',
        to: '=',
        idx: '@',
        pressed: '='
      },
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };


    //////
    function controller($scope) {


      var vm = this;
      //all available positions
      vm.positions = ['', '1', '2', '3', 'X'];
      vm.updateFrom = updateFrom;
      vm.updateTo = updateTo;
      vm.runCommand = runCommand;

      var logCommandFromSelection = function logCommandFromSelection(from, to, idx) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandFromSelection', {from: from, to: to, idx: idx})
        );
      };

      var logCommandToSelection = function logCommandToSelection(from, to, idx) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandToSelection', {from: from, to: to, idx: idx})
        );
      };
      var logCommandsExecution = function logCommandsExecution() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecute', {commandCount: 1})
        );
      };

      var logCommandsExecutionFinished = function logCommandsExecutionFinished() {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandsExecuteFinish', {commandCount: 1})
        );
      };

      var logCommandsExecutionError = function logCommandsExecutionError(from, to, idx) {
        readableLogService.saveLog(
          readableLogService.createCommandLog('commandExecuteError', {from: from, to: to, idx: idx})
        );
      };

      //////
      function updateFrom() {
        logCommandFromSelection(vm.from, vm.to, vm.idx);
      }


      function updateTo() {
        logCommandToSelection(vm.from, vm.to, vm.idx);
      }

      function runCommand() {
        vm.bgColor = '';
        if (vm.from && vm.to) {

          logCommandsExecution();
          var fromId = 'droppable' + vm.from;
          var toId = 'droppable' + vm.to;
          movePieceService.movePiece(fromId, toId, vm.idx)
            .then(function () {
              vm.pressed = true;
              questionBService.addToCommandHistory({from:toId,to:fromId,target:vm.idx});
            })
            .catch(function () {
              vm.bgColor = 'red';
              logCommandsExecutionError(vm.from, vm.to, 0);
            })
            .finally(function () {
              logCommandsExecutionFinished();
            });
        }

      }

    }
  }

}());
