/**
 * Created by guochen on 16/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('cardService', cardService);

  function cardService() {

    var _cardSeed = [
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
      return _.shuffle(_cardSeed[levelType]);
    }

    function pickDeployedCards(cards,level) {

      //level = _.parseInt();

      var shiftLeft = function() {return R.converge(R.append, R.head, R.tail)(cards)};
      var shiftRight = function() {return R.converge(R.prepend, R.last, R.init)(cards)};
      //currently, only works for arrays with three elements
      var swap = function() {return R.reverse(cards)};

      var getCards = R.cond(
        [R.eq(1), shiftLeft],
        [R.eq(2), shiftRight],
        [R.eq(3),swap]
      );

      return getCards(level);
    }
  }
}());

