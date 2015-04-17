/**
 * Created by guochen on 16/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('patternRandomisationService', patternRandomisationService);

  patternRandomisationService.$inject = ['patternMatchService'];
  function patternRandomisationService(patternMatchService) {
    //var cardSets = [
    //  [
    //    {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
    //    {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
    //    {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'}
    //  ],
    //  [
    //    {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
    //    {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
    //    {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'}
    //  ],
    //  [
    //    {id: 'question-a-img-b1', cardImgUrl: 'images/card-img-b1.png'},
    //    {id: 'question-a-img-b2', cardImgUrl: 'images/card-img-b2.png'},
    //    {id: 'question-a-img-b3', cardImgUrl: 'images/card-img-b3.png'}
    //  ],
    //  [
    //    {id: 'question-c-img-c1', cardImgUrl: 'images/card-img-c1.png'},
    //    {id: 'question-c-img-c2', cardImgUrl: 'images/card-img-c2.png'},
    //    {id: 'question-c-img-c3', cardImgUrl: 'images/card-img-c3.png'}
    //  ]
    //];

    var cardSets = [
      [
        {id: 'question-a-img-a1', cardImgUrl: 'images/card-img-a1.png'},
        {id: 'question-a-img-a2', cardImgUrl: 'images/card-img-a2.png'},
        {id: 'question-a-img-a3', cardImgUrl: 'images/card-img-a3.png'}
      ],
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
        {id: 'question-c-img-c1', cardImgUrl: 'images/card-img-c1.png'},
        {id: 'question-c-img-c2', cardImgUrl: 'images/card-img-c2.png'},
        {id: 'question-c-img-c3', cardImgUrl: 'images/card-img-c3.png'}
      ]
    ];


    var service = {
      pickLevelCards:pickLevelCards,
      pickDeployedCards:pickDeployedCards
    };

    return service;

    //////
    function pickLevelCards(levelType) {
      var tempCards = cardSets[levelType];
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

      console.log('desiredPattern start: ');
      console.log(desiredPattern.map(function(value){return value.id}));
      console.log('desiredPattern end: ');

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

    function pickDeployedCards(cards,level) {
      //copies input cards
      var manipulatedCards = angular.copy(cards);
      var tempCard;
      //remove this magic number later!
      if (level == 1) {
        tempCard = manipulatedCards.pop();
        manipulatedCards.unshift(tempCard);
      }
      else if (level == 2) {
        tempCard = manipulatedCards.shift();
        manipulatedCards.push(tempCard);
      }
      else if (level == 3) {
        tempCard = manipulatedCards[0];
        manipulatedCards[0] = manipulatedCards[manipulatedCards.length - 1];
        manipulatedCards[manipulatedCards.length - 1] = tempCard;
      }
      return manipulatedCards;
    }
  }
}());

