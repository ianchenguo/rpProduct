/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('cePopulatedTestArea', cePopulatedTestArea);

  //////
  cePopulatedTestArea.$inject = ['patternRandomisationService'];
  function cePopulatedTestArea(patternRandomisationService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/cePopulatedTestArea/cePopulatedTestArea.html',
      scope: {
        content: '@',
        level: '@',
        levelCards: '='
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      link: link

    }

    //////
    function controller() {
      var vm = this;
      //vm.setCards = setCards;
      //vm.deployedCards = vm.setCards();
      vm.deployedCards = patternRandomisationService.pickDeployedCards(vm.levelCards,vm.level);

      vm.testComponents = [
        [
          {
            title: '1',
            droppable: true,
            droppableId: 'droppable1',
            visibility: 'visible',
            card: vm.deployedCards[0],
            cardVisibility: true

          },
          {
            title: '2',
            droppable: true,
            droppableId: 'droppable2',
            visibility: 'visible',
            card: vm.deployedCards[1],
            cardVisibility: true
          },
          {
            title: '3',
            droppable: true,
            droppableId: 'droppable3',
            visibility: 'visible',
            card: vm.deployedCards[2],
            cardVisibility: true
          }
        ],
        [
          {title: 'placeholder', droppable: true, visibility: 'hidden'},
          {title: 'X', droppable: true, droppableId: 'droppableX', visibility: 'visible', cardVisibility: false},
          {title: 'placeholder', droppable: true, visibility: 'hidden'}
        ]
      ];

      //////
      function setCards() {

        var manipulatedCards = angular.copy(vm.levelCards);
        var tempCard;
        //remove this magic number later
        if (vm.level == 1) {
          tempCard = manipulatedCards.pop();
          manipulatedCards.unshift(tempCard);
        }
        else if (vm.level == 2) {
          tempCard = manipulatedCards.shift();
          manipulatedCards.push(tempCard);
        }
        else if (vm.level == 3) {
          tempCard = manipulatedCards[0];
          manipulatedCards[0] = manipulatedCards[manipulatedCards.length - 1];
          manipulatedCards[manipulatedCards.length - 1] = tempCard;
        }
        return manipulatedCards;
      }
    }

    function link(scope, el, attrs) {

    }
  }

}());
