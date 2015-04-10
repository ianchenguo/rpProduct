/**
 * Created by guochen on 4/03/A5.
 */

(function () {
  'use strict';
  angular
    .module('app.questionA')
    .directive('ceQuestionAFrame', ceQuestionAFrame);

  ceQuestionAFrame.$inject = ['patternMatchService'];
  function ceQuestionAFrame(patternMatchService) {
    return {
      restrict: 'E',
      scope: {
        levelType: '@',
        direction: '@'
      },
      templateUrl: 'scripts/webComponents/questionA/directives/ceQuestionAFrameDirective/ceQuestionAFrame.html',
      controller: controller,
      controllerAs: 'vm',
      bindToController:true
    }
    //////
    function controller(){
      console.log('i am in');

      var cardSets = [
        [],
        [
          {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
          {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
          {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'}
        ],
        [
          {id: 'question-a-img-b1', cardImgUrl: 'images/card-img-b1.png'},
          {id: 'question-a-img-b2', cardImgUrl: 'images/card-img-b2.png'},
          {id: 'question-a-img-b3', cardImgUrl: 'images/card-img-b3.png'}
        ],
        [
          {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
          {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
          {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'}
        ]
      ];
      var vm = this;
      vm.showDesiredPattern = vm.levelType > 0;
      vm.showInitialArea = vm.levelType < 2;
      vm.levelCards=[];

      activate();
      //////

      function activate() {
        vm.levelCards = vm.levelType > 0 ? pickLevelCards(): null;
      }

      function pickLevelCards() {
        var tempCards = cardSets[vm.levelType];
        return randomisePattern(tempCards);
      }

      function randomisePattern(tempCards) {

        var desiredPattern;
        var randomisedPositions;
        var rawPattern = tempCards;
        var positionLimit = tempCards.length;

        randomisedPositions = populateRandomArray();

        //magic numbers should be removed
        desiredPattern = [
          rawPattern[randomisedPositions[0]],
          rawPattern[randomisedPositions[1]],
          rawPattern[randomisedPositions[2]]
        ];

        console.log('desiredPattern start: ')
        console.log(desiredPattern.map(function(value){return value.id}));
        console.log('desiredPattern end: ')

        patternMatchService.setDesiredPattern(desiredPattern);

        return desiredPattern;

        //////
        //http://stackoverflow.com/questions/2380019/generate-8-unique-random-numbers-between-1-and-100
        function populateRandomArray() {

          var arr = [];
          while (arr.length < positionLimit) {
            var randomNumber = Math.floor(Math.random() * positionLimit);
            var found = false;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i] == randomNumber) {
                found = true;
                break
              }
            }
            if (!found)arr[arr.length] = randomNumber;
          }
          return arr;
        }
      }
    }
  }

}());
