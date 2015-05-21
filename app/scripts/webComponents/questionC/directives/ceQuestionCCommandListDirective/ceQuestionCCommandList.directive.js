/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .directive('ceQuestionCCommandList', ceQuestionCCommandList);

  ceQuestionCCommandList.$inject = ['$mdDialog', '$q', '$state', 'movePieceService', 'questionCService', 'readableLogService'];
  function ceQuestionCCommandList($mdDialog, $q, $state, movePieceService, questionCService, readableLogService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCCommandListDirective/ceQuestionCCommandList.html',
      scope: {level: '@'},
      controllerAs: 'vm',
      controller: ['$rootScope', controller],
      bindToController: true
    };


    //////
    function controller($rootScope) {

      var vm = this;

      var emmitCommandAddedEvt = function emmitCommandAddedEvt(cmd) {
        $rootScope.$broadcast('questionCCommandAdded', cmd);
      };

      var addCommand = function () {
        return questionCService.addCommand().map(emmitCommandAddedEvt);
      };

      var getDisableAdd = function() {
        return questionCService.getDisableAdd();
      };

      vm.commands = [
        {
          type: 'i',
          text: 'i equals 0',
          pressed: false,
          func: function () {
            return 0;
          }
        },
        {
          type: 'i',
          text: 'i equals 3',
          pressed: false,
          func: function () {
            return 3;
          }
        },
        {
          type: 'i',
          text: 'add 1 to i',
          pressed: false,
          func: function (i) {
            return i + 1;
          }
        },
        {
          type: 'i',
          text: 'subtract 1 from i',
          pressed: false,
          func: function (i) {
            return i - 1;
          }
        },
        {
          type: 'm',
          text: 'move i to i + 1',
          pressed: false,
          func: function (i, idx) {
            var j = i + 1;
            return movePieceService.movePiece('droppable' + i, 'droppable' + j, idx);
          }
        },
        {
          type: 'm',
          text: 'move i to i - 1',
          pressed: false,
          func: function (i, idx) {
            var j = i - 1;
            return movePieceService.movePiece('droppable' + i, 'droppable' + j, idx);
          }
        },
        {
          type: 'm',
          text: 'move i to X',
          pressed: false,
          func: function (i, idx) {
            return movePieceService.movePiece('droppable' + i, 'droppableX', idx);
          }
        },
        {
          type: 'm',
          text: 'move X to i',
          pressed: false,
          func: function (i, idx) {
            return movePieceService.movePiece('droppableX', 'droppable' + i, idx);
          }
        }];

      vm.addCommand = addCommand;
      vm.getDisableAdd = getDisableAdd;

      var activate = function() {
        questionCService.enableAdd(false);
      }();
    }
  }

}());
