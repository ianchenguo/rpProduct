/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestArea', ceTestArea);

  ceTestArea.$inject = ['patternRandomisationService'];
  function ceTestArea(patternRandomisationService) {
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

      var populateComponent = function populateComponent() {

        var deployedCards;
        function attachCard(value,index) {
          value.card = deployedCards[index];
          return value;
        }

        deployedCards = patternRandomisationService.pickDeployedCards(vm.levelCards,vm.level);

        return rawComponents[0].map(attachCard);
      };

      vm.shouldMatch = vm.level > 0;
      vm.testComponents = [[],[]];

      vm.shouldShowCards = function() {
        if(vm.question == 'a' && vm.level > 0) {
          return true;
        }

        return false;
      };

      activate();

      function activate() {
        if(vm.question == 'a' && vm.level > 0) {
          vm.testComponents[0] = populateComponent();
          vm.testComponents[1] = rawComponents[1];
        } else {
          vm.testComponents = rawComponents;
        }
      }
    }

    function link(scope, el, attrs) {

    }
  }

}());
