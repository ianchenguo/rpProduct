/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Question
  describe('Question', function(){

    //prepares testing env
    var Question, STATE, QUESTION_TYPE;
    beforeEach(module('app'));
    beforeEach(inject(function (_Question_, _STATE_, _QUESTION_TYPE_) {
      Question = _Question_;
      STATE = _STATE_;
      QUESTION_TYPE = _QUESTION_TYPE_;
    }));

    //prepares mock data
    var mockQuestionData;
    beforeEach(function(){
      mockQuestionData = {
        endTimeStamp:'',
        type:QUESTION_TYPE.a,
        state:STATE.created,
        quiz:'quiz_dummy_id'
      }
    });

    //tests properties
    it('should have an id', function(){
      expect(new Question(mockQuestionData)._id).toBeDefined;
    });

    it('should have a rev', function(){
      expect(new Question(mockQuestionData)._rev).toBeDefined;
    });

    it('should have a start time stamp', function(){
      expect(new Question(mockQuestionData).startTimeStamp).toMatch(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function(){
      expect(new Question(mockQuestionData).endTimeStamp).toEqual(mockQuestionData.endTimeStamp);
    });

    it('should have a type', function(){
      expect(new Question(mockQuestionData).type).toEqual(mockQuestionData.type);
    });

    it('should have a state', function(){
      expect(new Question(mockQuestionData).state).toEqual(mockQuestionData.state);
    });

    it('should have a quiz reference', function(){
      expect(new Question(mockQuestionData).quiz).toEqual(mockQuestionData.quiz);
    });

  });
}());
