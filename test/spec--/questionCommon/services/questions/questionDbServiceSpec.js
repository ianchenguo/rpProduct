/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests questionDbService
  describe('questionDbService', function () {

    //prepares testing env
    var questionDbService, Question, STATE, QUESTION_TYPE;
    beforeEach(module('app'));

    //solves 'Unexpected request" error, not working properly
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    beforeEach(inject(function (_questionDbService_, _Question_, _STATE_, _QUESTION_TYPE_) {

      questionDbService = _questionDbService_;
      Question = _Question_;
      STATE = _STATE_;
      QUESTION_TYPE = _QUESTION_TYPE_;
    }));

    //prepares mock data
    var mockQuestion;
    beforeEach(function () {
      mockQuestion = new Question(
        {
          endTimeStamp:'',
          type:QUESTION_TYPE.a,
          state:STATE.created,
          levels:[],
          quiz:'D-U-M-M-Y-Q-U-I-Z-I-D'
        }
      )
    });

    //tests createQuestion()
    describe('createQuestion()', function () {

      it('should save a Question object to database', function () {
        var promise = questionDbService.createQuestion(mockQuestion);
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      })
    });

    //tests getQuestion()
    describe('getQuestion()', function () {
      it('should get a Question object from database via id', function () {
        var promise = questionDbService.getQuestion(mockQuestion._id);
        expect(promise).to.eventually.have.property('_id').that.equals(mockQuestion._id);
      });
    });

  });
}());
