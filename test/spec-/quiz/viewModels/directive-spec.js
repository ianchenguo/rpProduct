/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Directive
  describe('Directive', function () {

    //prepares testing env
    var Directive, STATE;
    beforeEach(module('app'));
    beforeEach(inject(function (_Directive_, _STATE_) {
      Directive = _Directive_;
      STATE = _STATE_;
    }));

    //prepares mock data
    var mockDirectiveData;
    beforeEach(function () {
      mockDirectiveData = {
        endTimeStamp:'dummy-time-stamp',
        touches:['dummy-touch'],
        questionLevel:'dummy-question-level',
        state:STATE.created
      };
    });

    //tests properties
    it('should have an id', function () {
      expect(new Directive(mockDirectiveData)._id).toBeDefined();
    });

    it('should have a rev', function () {
      expect(new Directive(mockDirectiveData)._rev).toBeDefined();
    });

    it('should have a start time stamp', function () {
      expect(new Directive(mockDirectiveData).startTimeStamp).toMatch(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function () {
      expect(new Directive(mockDirectiveData).endTimeStamp).toEqual(mockDirectiveData.endTimeStamp);
    });

    it('should have an array of touches', function () {
      expect(Array.isArray(new Directive(mockDirectiveData).touches)).toBe(true);
    });

    it('should have a question level reference', function () {
      expect(new Directive(mockDirectiveData).questionLevel).toEqual(mockDirectiveData.questionLevel);
    })

    it('should have a state', function() {
      expect(new Directive(mockDirectiveData).state).toEqual(mockDirectiveData.state);

    });

  });
}());
