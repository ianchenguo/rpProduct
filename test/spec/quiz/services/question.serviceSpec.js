/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  //tests questionService
  describe('questionService', function () {

    //prepares testing env
    var questionService, Question, STATE, QUESTION_TYPE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz']);
      questionService = $injector.get('questionService');
      Question = $injector.get('Question');
      STATE = $injector.get('STATE');
      QUESTION_TYPE = $injector.get('QUESTION_TYPE');
    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests createQuestion()
    describe('createQuestion()', function () {

      var promise;
      beforeEach(function () {
        promise = questionService.createQuestion(QUESTION_TYPE.a);
      });

      it('should create a Question document in database', function (done) {

        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local Question object with a returned rev', function (done) {
        promise
          .then(shouldSyncQuestionState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuestionState(response) {
          expect(response.rev).toBe(questionService.getLocalQuestion()._rev);
        }
      });
    });

    //tests finishQuestion()
    describe('finishQuestion()', function () {

      var promise;
      beforeEach(function () {
        promise = questionService
          .createQuestion()
          .then(function () {
            return questionService.finishQuestion();
          });
      });

      it('should update question document in database', function (done) {
        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local Question object with a latest rev', function (done) {
        promise
          .then(shouldSyncQuestionState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuestionState(response) {
          expect(response.rev).toBe(questionService.getLocalQuestion()._rev);
        }
      });
    });
  });
}());
