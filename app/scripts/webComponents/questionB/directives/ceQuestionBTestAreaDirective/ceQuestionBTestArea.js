/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionB')
    .directive('ceQuestionBTestArea', ceQuestionBTestArea);

  ceQuestionBTestArea.$inject = ['cardService', 'cardBaseService'];
  function ceQuestionBTestArea(cardService, cardBaseService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionB/directives/ceQuestionBTestAreaDirective/ceQuestionBTestArea.html',
      scope: {
        levelType: "@"
      },
      controllerAs: 'vm',
      controller: controller,
      bindToController: true
    };


    //////
    function controller() {
      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      //vm.showInitialArea = vm.levelType < 2;
      vm.levelCards = [];
      vm.deployedCards = [];

      activate();
      //////

      function activate() {
        vm.levelCards = cardService.pickLevelCards(vm.levelType);
        vm.deployedCards = vm.levelType > 0 ? cardService.pickDeployedCards(vm.levelCards, _.parseInt(vm.levelType)) : [];
        cardBaseService.setDesiredPattern(vm.levelCards);
        cardBaseService.setInitPattern(vm.deployedCards);
      }
    }
  }

}());
