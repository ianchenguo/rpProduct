/**
 * Created by guochen on 28/04/15.
 */

(function () {
  'use strict';
  describe('cardService', function () {
    var cardService;
    beforeEach(module('app.questionCommon'));

    beforeEach(inject(function (_cardService_) {
      cardService = _cardService_;
    }));

    describe('pickDeployedCards()',function() {

      var mockCards;
      beforeEach(function(){
        mockCards = [1,2,3];
      });

      describe('pickDeployedCards when in left shift level', function() {
        it('should shift the cards left', function(){
          var shiftedCards = cardService.pickDeployedCards(mockCards,1);
          expect(shiftedCards).toEqual([2,3,1]);
        });
      });

      describe('pickDeployedCards when in shift right level', function() {
        it('should shift the cards right', function(){
          var shiftedCards = cardService.pickDeployedCards(mockCards,2);
          expect(shiftedCards).toEqual([3,1,2]);
        });
      });

      describe('pickDeployedCards when in symmetry level', function() {
        it('should swap cards at both ends', function() {
          var swappedCards = cardService.pickDeployedCards(mockCards,3);
          expect(swappedCards).toEqual([3,2,1]);
        });
      });
    });
  });

}());
