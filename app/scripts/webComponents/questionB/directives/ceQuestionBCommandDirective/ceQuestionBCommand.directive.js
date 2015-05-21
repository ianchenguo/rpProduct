/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommand', ceQuestionBCommand);

  ceQuestionBCommand.$inject = ['logQuestionExecutionService','questionBService','movePieceService', 'readableLogService'];
  function ceQuestionBCommand(logQuestionExecutionService,questionBService,movePieceService, readableLogService) {
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

      //////
      function updateFrom() {
        logQuestionExecutionService.logCommandFromSelection(vm.from, vm.to, vm.idx);
      }


      function updateTo() {
        logQuestionExecutionService.logCommandToSelection(vm.from, vm.to, vm.idx);
      }

      function runCommand() {
        vm.bgColor = '';
        if (vm.from && vm.to) {

          logQuestionExecutionService.logCommandExecution();
          var fromId = 'droppable' + vm.from;
          var toId = 'droppable' + vm.to;
          movePieceService.movePiece(fromId, toId, vm.idx)
            .then(function () {
              vm.pressed = true;
              questionBService.addToCommandHistory({from:toId,to:fromId,target:vm.idx});
            })
            .catch(function () {
              vm.bgColor = 'red';
              logQuestionExecutionService.logCommandExecutionError({from:vm.from, to:vm.to, idx:vm.idx});
            })
            .finally(function () {
              logQuestionExecutionService.logCommandExecutionFinished();
            });
        }

        else {
          vm.bgColor = 'red';
          logQuestionExecutionService.logCommandExecutionError({from:vm.from, to:vm.to, idx:vm.idx});
        }

      }

    }
  }

}());
