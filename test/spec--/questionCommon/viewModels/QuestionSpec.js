/**
 * Created by guochen on 13/03/15.
 */

(function () {
  'use strict';

  //tests view model Question
  describe('Question', function(){

    //prepares testing env
    var Question, QuestionLevel,STATE,QUESTION_TYPE,LEVEL_TYPE;
    beforeEach(module('app'));
    beforeEach(inject(function (_Question_, _QuestionLevel_, _STATE_,_QUESTION_TYPE_,_LEVEL_TYPE_) {
      Question = _Question_;
      QuestionLevel = _QuestionLevel_;
      STATE = _STATE_;
      QUESTION_TYPE = _QUESTION_TYPE_;
      LEVEL_TYPE = _LEVEL_TYPE_;
    }));

    //solves 'Unexpected request" error, not working properly
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    //prepares mock data
    var mockQuestionData,mockQuestionDataLevels;
    beforeEach(function(){

      mockQuestionDataLevels = [new QuestionLevel({endTimeStamp:'',type:LEVEL_TYPE.zero,state:STATE.created})];

      mockQuestionData = {
        endTimeStamp:'',
        type:QUESTION_TYPE.a,
        state:STATE.created,
        levels:mockQuestionDataLevels,
        quiz:'quiz_dummy_id'
      }
    });

    //tests properties
    it('should have an id', function(){
      expect(new Question(mockQuestionData)._id).to.match(/^question_\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have a rev', function(){
      expect(new Question(mockQuestionData)._rev).to.exist;
    });

    it('should have a start time stamp', function(){
      expect(new Question(mockQuestionData).startTimeStamp).to.match(/^\d\d\d\d-\d\d-\d\d\w\d\d:\d\d:\d\d.\d\d\d\w$/);
    });

    it('should have an end time stamp', function(){
      expect(new Question(mockQuestionData).endTimeStamp).to.equal(mockQuestionData.endTimeStamp);
    });

    it('should have a type', function(){
      expect(new Question(mockQuestionData).type).to.equal(mockQuestionData.type);
    });

    it('should have a state', function(){
      expect(new Question(mockQuestionData).state).to.equal(mockQuestionData.state);
    });

    it('should have an array of QuestionLevel objects', function(){
      expect(new Question(mockQuestionData).levels).to.equal(mockQuestionDataLevels);
    });

    it('should have a quiz reference', function(){
      expect(new Question(mockQuestionData).quiz).to.equal(mockQuestionData.quiz);
    });

    describe('addLevel()', function(){
      it('should add a level object into the levels property', function(){
        var question = new Question(mockQuestionData);
        var newLevel = new QuestionLevel({endTimeStamp:'',type:LEVEL_TYPE.zero,state:STATE.created});
        question.addLevel(newLevel);
        expect(question.levels).to.contain(newLevel);
      });
    })
  });
}());
