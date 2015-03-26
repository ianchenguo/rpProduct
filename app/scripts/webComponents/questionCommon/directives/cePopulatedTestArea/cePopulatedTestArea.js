/**
 * Created by guochen on 4/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .directive('cePopulatedTestArea', cePopulatedTestArea);

  //////
  cePopulatedTestArea.$inject = ['patternMatchService'];
  function cePopulatedTestArea(patternMatchService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/webComponents/questionCommon/directives/cePopulatedTestArea/cePopulatedTestArea.html',
      scope: {
        content: '@',
        level: '@',
        direction:'@'
      },
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
      link: link

    }

    //////
    function controller() {
      var vm = this;

      //console.log('vm.level: ' + vm.level);

      vm.testComponents = [[[{
        title: '1',
        droppable: true,
        droppableId: 'droppable1',
        visibility: 'visible',
        card: {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'},
        cardVisibility:true

      },
        {
          title: '2',
          droppable: true,
          droppableId: 'droppable2',
          visibility: 'visible',
          card: {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
          cardVisibility:true
        },
        {
          title: '3',
          droppable: true,
          droppableId: 'droppable3',
          visibility: 'visible',
          card: {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
          cardVisibility:true
        }
      ],
        [{title: 'placeholder', droppable: true, visibility: 'hidden'},
          {title: 'X', droppable: true,droppableId: 'droppable4', visibility: 'visible', cardVisibility:false},
          {title: 'placeholder', droppable: true, visibility: 'hidden'}]],
        [[{
          title: '1',
          droppable: true,
          droppableId: 'droppable1',
          visibility: 'visible',
          card: {id: 'question-a-img-b3', cardImgUrl: 'images/card-img-b3.png'},
          cardVisibility:true
        },
          {
            title: '2',
            droppable: true,
            droppableId: 'droppable2',
            visibility: 'visible',
            card: {id: 'question-a-img-b2', cardImgUrl: 'images/card-img-b2.png'},
            cardVisibility:true
          },
          {
            title: '3',
            droppable: true,
            droppableId: 'droppable3',
            visibility: 'visible',
            card: {id: 'question-a-img-b1', cardImgUrl: 'images/card-img-b1.png'},
            cardVisibility:true
          }
        ],
          [{title: 'placeholder', droppable: true, visibility: 'hidden'},
            {title: 'X', droppable: true,droppableId: 'droppable4', visibility: 'visible', cardVisibility:false},
            {title: 'placeholder', droppable: true, visibility: 'hidden'}]]

      ];

      vm.initPatternMatchService = function() {

        var patterns = [['question-a-img-a3','question-a-img-a2','question-a-img-a1'],
        ['question-a-img-b3','question-a-img-b2','question-a-img-b1']];



        patternMatchService.initMatch(patterns[vm.direction],vm.direction);
      }();
    }

    function link(scope, el, attrs) {

    }
  }

}());
