/**
 * Created by guochen on 28/04/15.
 */

(function () {
  'use strict';
  describe('cardBaseService', function () {
    var cardBaseService;
    var mockCards;

    beforeEach(module('app.questionCommon'));

    beforeEach(inject(function (_cardBaseService_) {
      cardBaseService = _cardBaseService_;
    }));

    beforeEach(function () {
      mockCards = [{id: 1}, {id: 2}, {id: 3}];
    });
    describe('setDesiredPattern()', function () {


      it('should sets desired pattern', function () {
        cardBaseService.setDesiredPattern(mockCards);
        expect(R.eqDeep(cardBaseService.getDesiredPattern(),
          {
            'ce-test-base-1': 1,
            'ce-test-base-2': 2,
            'ce-test-base-3': 3,
            'ce-test-base-x': undefined
          }
        )).toBe(true);
      });
    });

    describe('setInitPattern()', function () {

      it('should initialise current pattern', function () {
        cardBaseService.setInitPattern(mockCards);
        expect(R.eqDeep(cardBaseService.getCurrentPattern(),
          {
            'ce-test-base-1': 1,
            'ce-test-base-2': 2,
            'ce-test-base-3': 3,
            'ce-test-base-x': undefined
          }
        )).toBe(true);

      });
    });

    describe('testPatterns()', function () {

      it('should return true when the current pattern matches the desired pattern', function () {
        cardBaseService.setDesiredPattern(mockCards);
        cardBaseService.setInitPattern(mockCards);
        expect(cardBaseService.testPatterns()).toBe(true);
      });

      it('should returns false when the current pattern does not match the desired pattern', function () {
        var anotherMockCards = [{id: undefined}, {id: 2}, {id: 3}];
        cardBaseService.setDesiredPattern(anotherMockCards);
        cardBaseService.setInitPattern(mockCards);
        expect(cardBaseService.testPatterns()).toBe(false);
      });
    });

    describe('updateCurrentPatternPosition()', function () {

      describe('updateCurrentPatternPosition() when a card is dragged from base 1 to base x', function () {

        it('should update current pattern accordingly', function () {
          mockCards = [{id: 1}, {id: 2}, {id: 3}];
          cardBaseService.setDesiredPattern(mockCards);
          cardBaseService.setInitPattern(mockCards);

          cardBaseService.updateCurrentPatternPosition('ce-test-base-1',undefined);
          cardBaseService.updateCurrentPatternPosition('ce-test-base-x',1);
          expect(cardBaseService.getCurrentPattern()['ce-test-base-1']).toEqual(undefined);
          expect(cardBaseService.getCurrentPattern()['ce-test-base-x']).toEqual(1);
        });
      });
    });
  });

}());
