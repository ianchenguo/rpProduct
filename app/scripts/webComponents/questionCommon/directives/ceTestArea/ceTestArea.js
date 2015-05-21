/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestArea', ceTestArea);

  ceTestArea.$inject = ['cardBaseService'];
  function ceTestArea(cardBaseService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceTestArea/ceTestArea.html',
      scope: {
        question: '@',
        level: '@',
        levelCards: '=',
        deployedCards: '='
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true

    };

    //////
    function controller() {
      var vm = this;
      var rawComponents = cardBaseService.getCardBases();

      vm.shouldMatch = vm.level > 0;
      vm.testComponents = [[], []];
      vm.shouldShowCards = shouldShowCards;
      vm.shouldMatch = false;
      activate();

      //////

      function shouldShowCards() {
        if (vm.question == 'a' && vm.level == 0) {
          return false;
        }
        return true;
      }

      function activate() {
        if ((vm.question == 'a' && vm.level > 0) || vm.question !== 'a') {
          vm.testComponents[0] = prepareComponents();
          vm.testComponents[1] = rawComponents[1];
        } else {
          vm.testComponents = rawComponents;
        }

        if(vm.level > 0) vm.shouldMatch = true;
      }

      function prepareComponents() {
        return populateComponents(vm.deployedCards);
      }

      function populateComponents(deployedCards) {

        function attachCard(value, index) {
          value.card = deployedCards[index];
          return value;
        }

        return rawComponents[0].map(attachCard);
      }
    }


  }

}());
