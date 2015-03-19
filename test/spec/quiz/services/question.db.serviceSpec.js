/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests questionDbService
  describe('questionDbService', function () {

    //prepares testing env
    var questionDbService, Question, STATE, QUESTION_TYPE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz']);
      questionDbService = $injector.get('questionDbService');
      Question = $injector.get('Question');
      STATE = $injector.get('STATE');
      QUESTION_TYPE = $injector.get('QUESTION_TYPE');
    });


    //prepares mock data
    var mockQuestion;
    beforeEach(function () {
      mockQuestion = new Question(
        {
          endTimeStamp:'',
          type:QUESTION_TYPE.a,
          state:STATE.created,
          quiz:'quiz_dummy_id'
        }
      )
    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests putQuestion()
    describe('putQuestion()', function () {

      it('should put a question document in database', function (done) {

        questionDbService.putQuestion(mockQuestion)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //tests getQuestion()
    describe('getQuestion()', function () {

      function getQuestionById(value) {
        return questionDbService.getQuestion(value.id);
      }

      function shouldGetTheRightQuestion(question) {
        expect(question._id).toBe(mockQuestion._id);
      }

      it('should get a question document from database with provided id', function (done) {

        questionDbService.putQuestion(mockQuestion)
          .then(getQuestionById)
          .then(shouldGetTheRightQuestion)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });
  });
}());
