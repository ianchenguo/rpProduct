/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
    // angular.module('app.questionC').directive('ceQuestionCCommand', ceQuestionCCommand);

    var directiveM = angular.module('app.questionC');



  directiveM.directive('ceQuestionCCommand', [function(){
    // Runs during compile
    return {
      scope: {
        level: '@',
        from: '=',
        to: '=',
        idx: '@'
      },
      controllerAs: 'vm',
      controller: function($scope, $element, qcCommandInforRequest) {
          qcCommandInforRequest.obtainDossierService(gainData);

          function gainData (dataFromService) {
            $scope.dibs = dataFromService;
          };

          var vm = this;
          vm.positions = ['1', '2', '3', 'X'];


      },
      restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandDirective/ceQuestionCCommand.html',
      bindToController: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {

      }
    };
  }]);

  // ceQuestionCCommand.$inject = ['movePieceService', 'readableLogService'];
  // movePieceService, readableLogService
  /*function ceQuestionCCommand() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandDirective/ceQuestionCCommand.html',
      
      controllerAs: 'vm',
      controller: ['$scope', controller],
      
    };

    //////
    function controller($scope) {*/


      /*var vm = this;
      vm.positions = ['1', '2', '3', 'X'];*/

      //all available positions
      // vm.positions = ['', '1', '2', '3', 'X'];
      // vm.updateFrom = updateFrom;
      // vm.updateTo = updateTo;


      // var logCommandFromSelection = function logCommandFromSelection(from, to, idx) {
      //   readableLogService.saveLog(
      //     readableLogService.createCommandLog('commandFromSelection', {from: from, to: to, idx: idx})
      //   );
      // };

      // var logCommandToSelection = function logCommandToSelection(from, to, idx) {
      //   readableLogService.saveLog(
      //     readableLogService.createCommandLog('commandToSelection', {from: from, to: to, idx: idx})
      //   );
      // };
      // var logCommandsExecution = function logCommandsExecution() {
      //   readableLogService.saveLog(
      //     readableLogService.createCommandLog('commandsExecute', {commandCount: 1})
      //   );
      // };

      // var logCommandsExecutionFinished = function logCommandsExecutionFinished() {
      //   readableLogService.saveLog(
      //     readableLogService.createCommandLog('commandsExecuteFinish', {commandCount: 1})
      //   );
      // };

      // var logCommandsExecutionError = function logCommandsExecutionError(from, to, idx) {
      //   readableLogService.saveLog(
      //     readableLogService.createCommandLog('commandExecuteError', {from: from, to: to, idx: idx})
      //   );
      // };

      //////
      /*function updateFrom() {
        logCommandFromSelection(vm.from, vm.to, vm.idx);
        move();
        console.log('updateFrom_Function');
      }


      function updateTo() {
        logCommandToSelection(vm.from, vm.to, vm.idx);
        move();
        console.log('updateTo_Function');
      }*/

      //move function start
      /*function move() {
        if (vm.level == 0) {

          vm.bgColor = '';
          if (vm.from && vm.to) {

            logCommandsExecution();
            var fromId = 'droppable' + vm.from;
            var toId = 'droppable' + vm.to;
            movePieceService.movePiece(fromId, toId, vm.idx)
              .catch(function () {
                vm.bgColor = 'red';
                logCommandsExecutionError(vm.from, vm.to, 0);
              })
              .finally(function(){
                logCommandsExecutionFinished();
              });

          }
        }

      }*/
      //end move function

    /*}
  }*/




    directiveM.directive('repeadCreateCommandsDisplay', [function(){
      // Runs during compile
      return {
        scope: {dibhere: '='}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'A',
        // template: ,
        templateUrl: './scripts/webComponents/questionC/directives/ceQuestionCCommandDirective/ng-commands-td.html',
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            var commandTdSlab = iElm.find('td');
        }
      };
    }]);

    directiveM.directive('ionicHeaderListCommandSlab', [function(){
      // Runs during compile
      return {
        scope: {},
        // controller: function($scope, $element, $attrs, $transclude) {},
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandDirective/command-list-command-header.html',
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
          
        }
      };
    }]);

}());
