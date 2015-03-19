/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  //tests quizService
  describe('quizService', function () {

    //prepares testing env
    var quizService, Quiz, GENDER;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz']);
      quizService = $injector.get('quizService');
      Quiz = $injector.get('Quiz');
      GENDER = $injector.get('GENDER');
    });

    //prepares mock data
    var mockChildData, mockObserverData;
    beforeEach(function () {
      mockChildData = {firstName: 'Sam', lastName: 'Fisher', age: 8, gender: GENDER.male};
      mockObserverData = {firstName: 'Sam', lastName: 'Fisher', email: 'sam.fisher@jmail.com'};

    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests createQuiz()
    describe('createQuiz()', function () {

      var promise;
      beforeEach(function () {
        promise = quizService.createQuiz(mockChildData, mockObserverData);
      });

      it('should create a Quiz document in database', function (done) {

        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local Quiz object with a returned rev', function (done) {

        promise
          .then(shouldSyncQuizState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuizState(response) {
          expect(response.rev).toBe(quizService.getLocalQuiz()._rev);
        }
      });
    });

    //tests finishQuiz()
    describe('finishQuiz()', function () {

      var promise;
      beforeEach(function () {
        promise = quizService
          .createQuiz(mockChildData, mockObserverData)
          .then(function () {
            return quizService.finishQuiz();
          });
      });

      it('should update quiz document in database', function (done) {
        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local Quiz object with a latest rev', function (done) {
        promise
          .then(shouldSyncQuizState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuizState(response) {
          expect(response.rev).toBe(quizService.getLocalQuiz()._rev);
        }
      });
    });

  });
}());
