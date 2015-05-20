/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionC')
    .directive('ceQuestionCTestArea', ceQuestionCTestArea);

  ceQuestionCTestArea.$inject = ['questionCService', 'cardService', 'cardBaseService'];
  function ceQuestionCTestArea(questionCService, cardService, cardBaseService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionC/directives/ceQuestionCTestAreaDirective/ceQuestionCTestArea.html',
      scope: {
        levelType: '@',
        questionType: '@'
      },
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    };


    //////
    function controller() {
      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      vm.levelCards = [];
      vm.deployedCards = [];

      activate();
      //////

      function activate() {
        vm.levelCards = cardService.pickLevelCards(vm.levelType);
        vm.deployedCards = cardService.pickDeployedCards(vm.levelCards, _.parseInt(vm.levelType));
        cardBaseService.setDesiredPattern(vm.levelCards);
        cardBaseService.setInitPattern(vm.deployedCards);

        if (vm.levelType > 3) {
          questionCService.memoriseInitState(vm.deployedCards);
        }
      }
    }
  }

}());
