/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  //tests questionLevelService
  describe('questionLevelService', function () {

    //prepares testing env
    var dbService, questionService, questionLevelService, QuestionLevel, STATE, LEVEL_TYPE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      questionService = $injector.get('questionService');
      questionLevelService = $injector.get('questionLevelService');
      QuestionLevel = $injector.get('QuestionLevel');
      STATE = $injector.get('STATE');
      LEVEL_TYPE = $injector.get('LEVEL_TYPE');
      dbService = $injector.get('dbService');

    });

    beforeEach(function(done){
      dbService.deleteDB()
        .then(function(){
          return dbService.createDB();
        })
        .finally(done);
    })

    //stubs parent question id
    beforeEach(function () {
      spyOn(questionService,'getLocalQuestion').and.returnValue({_id:'dummy-question-id'});
    });

    function shouldNotBeCalled(rejection) {
      console.log(rejection);
      self.fail(rejection);
    }

    function shouldBeOK(response) {
      expect(response.ok).toBe(true);
    }

    //tests createQuestionLevel()
    describe('createQuestionLevel()', function () {

      var promise;
      beforeEach(function () {
        promise = questionLevelService.createQuestionLevel(LEVEL_TYPE.zero);
      });

      it('should create a QuestionLevel document in database', function (done) {

        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local QuestionLevel object with a returned rev', function (done) {
        promise
          .then(shouldSyncQuestionLevelState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuestionLevelState(response) {
          expect(response.rev).toBe(questionLevelService.getLocalQuestionLevel()._rev);
        }
      });
    });

    //tests finishQuestionLevel()
    describe('finishQuestionLevel()', function () {

      var promise;
      beforeEach(function () {
        promise = questionLevelService
          .createQuestionLevel()
          .then(function () {
            return questionLevelService.finishQuestionLevel();
          });
      });

      it('should update question level document in database', function (done) {
        promise
          .then(shouldBeOK)
          .catch(shouldNotBeCalled)
          .finally(done);
      });

      it('should sync local QuestionLevel object with a latest rev', function (done) {
        promise
          .then(shouldSyncQuestionLevelState)
          .catch(shouldNotBeCalled)
          .finally(done);

        function shouldSyncQuestionLevelState(response) {
          expect(response.rev).toBe(questionLevelService.getLocalQuestionLevel()._rev);
        }
      });
    });
  });
}());
