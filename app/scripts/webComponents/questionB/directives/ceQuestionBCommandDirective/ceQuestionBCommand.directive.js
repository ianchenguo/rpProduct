/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBCommand', ceQuestionBCommand);

  ceQuestionBCommand.$inject = ['movePieceService'];
  function ceQuestionBCommand(movePieceService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBCommandDirective/ceQuestionBCommand.html',
      scope: {},
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    }


    //////
    function controller($scope) {
      var vm = this;
      //all available positions
      vm.positions = ['1', '2', '3', 'X'];
      vm.fromPosition = '';
      vm.toPosition = '';
      vm.update = update;


      //////
      function update() {

        console.log('in update');

        if (vm.fromPosition && vm.toPosition) {
          var fromId = 'droppable' + vm.fromPosition;
          var toId = 'droppable' + vm.toPosition;
          var isMoved = movePieceService.movePiece(fromId, toId);

          if (isMoved) {
            $scope.$apply();
          }

        }
      }
    }
  }

}());
