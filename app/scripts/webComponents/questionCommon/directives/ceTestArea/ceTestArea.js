/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('ceTestArea', ceTestArea);

  function ceTestArea() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/ceTestArea/ceTestArea.html',
      scope: {
        question: '@',
        level: '@',
        levelCards:'=',
        deployedCards:'=',
        shouldMatch: '@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true

    };

    //////
    function controller() {
      var vm = this;
      var rawComponents = [
        [
          {title: '1', droppable: true, droppableId: 'droppable1', id:'ce-test-base-1'},
          {title: '2', droppable: true, droppableId: 'droppable2', id:'ce-test-base-2'},
          {title: '3', droppable: true, droppableId: 'droppable3', id:'ce-test-base-3'}
        ],
        [
          {title: 'X', droppable: true, droppableId: 'droppableX', id:'ce-test-base-x'}
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
        return populateComponents(vm.deployedCards);
      }

      function populateComponents(deployedCards) {

        function attachCard(value,index) {
          value.card = deployedCards[index];
          return value;
        }
        return rawComponents[0].map(attachCard);
      }
    }


  }

}());
