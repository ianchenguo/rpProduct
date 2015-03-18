/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests questionLvlDbService
  describe('questionLvlDbService', function () {

    //prepares testing env
    var questionLvlDbService, QuestionLevel, STATE, LEVEL_TYPE;
    beforeEach(module('app'));
    beforeEach(inject(function (_questionLvlDbService_, _QuestionLevel_, _STATE_, _LEVEL_TYPE_) {

      questionLvlDbService = _questionLvlDbService_;
      QuestionLevel = _QuestionLevel_;
      STATE = _STATE_;
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
    var mockQuestionLevel;
    beforeEach(function () {
      mockQuestionLevel = new QuestionLevel(
        {
          endTimeStamp:'',
          type:LEVEL_TYPE.zero,
          state:STATE.created,
          question:'D-U-M-M-Y-Q-U-E-S-T-I-O-N-I-D'
        }
      )
    });

    //tests createQuestionLevel()
    describe('createQuestionLevel()', function () {

      it('should save a QuestionLevel object to database', function () {
        var promise = questionLvlDbService.createQuestionLevel(mockQuestionLevel);
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      })
    });

    //tests getQuestionLevel()
    describe('getQuestionLevel()', function () {
      it('should get a QuestionLevel object from database via id', function () {
        var promise = questionLvlDbService.getQuestionLevel(mockQuestionLevel._id);
        expect(promise).to.eventually.have.property('_id').that.equals(mockQuestionLevel._id);
      });
    });

  });
}());
