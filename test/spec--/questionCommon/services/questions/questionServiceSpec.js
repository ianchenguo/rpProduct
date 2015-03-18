/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  //tests questionService
  describe('questionService', function () {

    //prepares testing env
    var quizService, questionService, Question, QUESTION_TYPE,STATE;
    beforeEach(module('app'));
    beforeEach(inject(function (_quizService_, _questionService_, _Question_, _QUESTION_TYPE_,_STATE_) {
      quizService = _quizService_;
      questionService = _questionService_;
      Question = _Question_;
      QUESTION_TYPE = _QUESTION_TYPE_;
      STATE = _STATE_;
    }));

    //solves 'Unexpected request" error, not working properly
    beforeEach(inject(function ($httpBackend) {
      $httpBackend.expectGET("quiz/questionA/questionA.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("quiz/info/quizInfo.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("sideMenu/sideMenu.html").respond("<div>mock template</div>");
      $httpBackend.expectGET("welcome/welcome.html").respond("<div>mock template</div>");
    }));

    //tests getLocalQuestion() may be only for test purpose
    describe('getLocalQuestion()', function () {
      it('should get the local Question object', function () {
        expect(questionService.getLocalQuestion()).to.be.instanceof(Question);
      });
    });

    //tests initQuestion()
    describe('initQuestion()', function () {

      it('should initialise local Question object', function () {
        questionService.initQuestion();
        expect(questionService.getLocalQuestion()).to.have.property('quiz').that.equals(quizService.getLocalQuiz()._id);
      });

      it('should create a question document in database', function () {
        var promise = questionService.initQuestion();
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      });
    });

    //tests getQuestion()
    describe('getQuestion()', function () {

      it('should get question document by id and sync local Question object with it', function () {
        var promise = questionService.initQuestion();
        promise.then(function () {
          var local = questionService.getLocalQuestion();

          expect(questionService.getQuestion(local._id)).to.eventually.have.property('_rev')
            .that.equals(questionService.getLocalQuestion()._rev);
        });

      });
    });


  });
}());
