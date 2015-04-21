/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestArea', ceTestArea);

  ceTestArea.$inject = [
    'patternMatchService',
    'patternRandomisationService'];
  function ceTestArea(patternMatchService,
                      patternRandomisationService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceTestArea/ceTestArea.html',
      scope: {
        question: '@',
        level: '@',
        levelCards:'=',
        shouldMatch: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      link: link

    };

    //////
    function controller() {
      var vm = this;
      var rawComponents = [
        [
          {title: '1', droppable: true, droppableId: 'droppable1'},
          {title: '2', droppable: true, droppableId: 'droppable2'},
          {title: '3', droppable: true, droppableId: 'droppable3'}
        ],
        [
          {title: 'X', droppable: true, droppableId: 'droppableX'}
        ]
      ];

      vm.shouldMatch = vm.level > 0;
      vm.testComponents = [[],[]];
      vm.shouldShowCards = shouldShowCards;

      activate();

      //////

      function shouldShowCards() {
         return vm.question == 'a' && vm.level > 0;
      }

      function activate() {
        if(vm.question == 'a' && vm.level > 0) {
          vm.testComponents[0] = prepareComponents();
          vm.testComponents[1] = rawComponents[1];
        } else {
          vm.testComponents = rawComponents;
        }
      }

      function prepareComponents() {
        var deployedCards = patternRandomisationService.pickDeployedCards(vm.levelCards,vm.level);
        patternMatchService.initMatch(deployedCards);
        return populateComponents(deployedCards);

      }

      function populateComponents(deployedCards) {

        function attachCard(value,index) {
          value.card = deployedCards[index];
          return value;
        }
        return rawComponents[0].map(attachCard);
      }
    }

    function link(scope, el, attrs) {

    }
  }

}());
