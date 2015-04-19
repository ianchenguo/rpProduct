/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model QuestionLevel
  describe('QuestionLevel', function () {

    //prepares testing env
    var QuestionLevel, STATE, LEVEL_TYPE;

    beforeEach(module('app'));

    beforeEach(inject(function (_QuestionLevel_, _STATE_, _LEVEL_TYPE_) {
      QuestionLevel = _QuestionLevel_;
      STATE = _STATE_;
      LEVEL_TYPE = _LEVEL_TYPE_;
    }));

    //prepares mock data
    var mockLevelData;
    beforeEach(function () {
      mockLevelData= {
        endTimeStamp:'',
        type:LEVEL_TYPE.zero,
        state:STATE.created,
        question:'question_dummy_id'
      }
    });

    //tests properties
    it('should have an id', function () {
      //2015-03-14T23:58:19.002Z
      expect(new QuestionLevel(mockLevelData)._id).toBeDefined();;
    });

    it('should have a rev', function(){
      expect(new QuestionLevel(mockLevelData)._rev).toBeDefined();
    });

    it('should have a start time stamp', function () {
      expect(new QuestionLevel(mockLevelData).startTimeStamp).toMatch(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function () {
      expect(new QuestionLevel(mockLevelData).endTimeStamp).toEqual(mockLevelData.endTimeStamp);
    });

    it('should have a type', function () {
      expect(new QuestionLevel(mockLevelData).type).toEqual(mockLevelData.type);
    });

    it('should have a state', function () {
      expect(new QuestionLevel(mockLevelData).state).toEqual(mockLevelData.state);
    });

    it('should have a question reference', function () {
      expect(new QuestionLevel(mockLevelData).question).toEqual(mockLevelData.question);
    });

  });
}());
