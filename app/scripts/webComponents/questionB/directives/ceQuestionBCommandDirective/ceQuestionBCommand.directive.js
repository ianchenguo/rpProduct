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
      scope: {
        level: '@',
        from: '=',
        to: '='
      },
      controllerAs: 'vm',
      controller: ['$scope', controller],
      bindToController: true
    };


    //////
    function controller($scope) {
      var vm = this;
      //all available positions
      vm.positions = ['1', '2', '3', 'X'];
      vm.update = update;


      //////
      function update() {

        if (vm.level === 0) {
          if (vm.from && vm.to) {
            var fromId = 'droppable' + vm.from;
            var toId = 'droppable' + vm.to;
            var isMoved = movePieceService.movePiece(fromId, toId);

            if (isMoved) {
              $scope.$apply();
            }
          }
        }
      }

    }
  }

}());
