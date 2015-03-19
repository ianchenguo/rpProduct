/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests questionLevelDbService
  describe('questionLevelDbService', function () {

    //prepares testing env
    var questionLevelDbService, QuestionLevel, LEVEL_TYPE, STATE;

    beforeEach(function () {
      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz']);
      questionLevelDbService = $injector.get('questionLevelDbService');
      QuestionLevel = $injector.get('QuestionLevel');
      LEVEL_TYPE = $injector.get('LEVEL_TYPE');
      STATE = $injector.get('STATE');
    });

    //prepares mock data
    var mockQuestionLevel;
    beforeEach(function () {
      mockQuestionLevel = new QuestionLevel(
        {
          endTimeStamp:'',
          type:LEVEL_TYPE.zero,
          state:STATE.created,
          question:'question_dummy_id'
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

    //tests putQuestionLevel()
    describe('putQuestionLevel()', function () {

      it('should put a question level document in database', function (done) {

        questionLevelDbService.putQuestionLevel(mockQuestionLevel)
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

    //tests getQuestionLevel()
    describe('getQuestionLevel()', function () {

      function getQuestionLevelById(value) {
        return questionLevelDbService.getQuestionLevel(value.id);
      }

      function shouldGetTheRightQuestionLevel(question) {
        expect(question._id).toBe(mockQuestionLevel._id);
      }

      it('should get a question level document from database with provided id', function (done) {

        questionLevelDbService.putQuestionLevel(mockQuestionLevel)
          .then(getQuestionLevelById)
          .then(shouldGetTheRightQuestionLevel)
          .catch(shouldNotBeCalled)
          .finally(done);
      });
    });

  });
}());
