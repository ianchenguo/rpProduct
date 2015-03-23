/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';

  //tests questionLevelDbService
  describe('questionLevelDbService', function () {

    //prepares testing env
    var dbService, questionLevelDbService, QuestionLevel, LEVEL_TYPE, STATE;

    beforeEach(function () {
      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      questionLevelDbService = $injector.get('questionLevelDbService');
      QuestionLevel = $injector.get('QuestionLevel');
      LEVEL_TYPE = $injector.get('LEVEL_TYPE');
      STATE = $injector.get('STATE');
      dbService = $injector.get('dbService');

    });

    beforeEach(function(done){
      dbService.deleteDB()
        .then(function(){
          return dbService.createDB();
        })
        .finally(done);
    })

    //prepares mock data
    var mockQuestionLevel;
    beforeEach(function () {
      mockQuestionLevel = new QuestionLevel(
        {
          endTimeStamp: '',
          type: LEVEL_TYPE.zero,
          state: STATE.created,
          question: 'question_dummy_id'
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

    describe('getTheLastQuestionLevel()', function (done) {
      it('should get the last question level document from database', function () {

        var mockQuestionLevel1 = new QuestionLevel(
          {
            endTimeStamp: 'dummy_end_time_stamp',
            type: LEVEL_TYPE.zero,
            state: STATE.finished,
            question: 'question_dummy_id'
          });

        var mockQuestionLevel2 = new QuestionLevel(
          {
            endTimeStamp: '',
            type: LEVEL_TYPE.one,
            state: STATE.created,
            question: 'question_dummy_id'
          })

        questionLevelDbService
          .putQuestionLevel(mockQuestionLevel1)
          .then(function () {
            return questionLevelDbService.putQuestionLevel(mockQuestionLevel2)
          })
          .then(function () {
            return questionLevelDbService.getLastQuestionLevel()
          })
          .then(shouldBe2ndMockLevel)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldBe2ndMockLevel(value) {
          console.log(value.rows[0]);
          expect(value.rows[0].id).toEqual(mockQuestionLevel2._id);
          return value;
        }
      });
    });
  });
}());
