/**
 * Created by guochen on 22/03/15.
 */

(function () {
  'use strict';

  describe('switchLevelService', function () {

    var switchLevelService,
      questionService,
      questionLevelService,
      questionLevelDbService,
      QUESTION_TYPE,
      LEVEL_TYPE,
      STATE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.dbService', 'app.quiz', 'app.quiz.questions']);
      switchLevelService = $injector.get('switchLevelService');
      questionService = $injector.get('questionService');
      questionLevelService = $injector.get('questionLevelService');
      questionLevelDbService = $injector.get('questionLevelDbService');
      QUESTION_TYPE = $injector.get('QUESTION_TYPE');
      LEVEL_TYPE = $injector.get('LEVEL_TYPE');
      STATE = $injector.get('STATE');
    });



    describe('switchLevel()', function () {

      beforeEach(function (done) {
        questionService
          .createQuestion(QUESTION_TYPE.a)
          .then(function () {
            return questionLevelService.createQuestionLevel(LEVEL_TYPE.zero);
          })
          .then(function(value){
            console.log(value);
          })
          .finally(done);
      });

      function shouldNotBeCalled(rejection) {
        console.log(rejection);
        self.fail(rejection);
      }

      function shouldBeOK(response) {
        expect(response.ok).toBe(true);
        return response;
      }

      it('should finish current level, create a new level and maintain current question,' +
        ' if the target level is within the same question'
        , function (done) {
          console.log(questionService.getLocalQuestion());
          console.log(questionLevelService.getLocalQuestionLevel());
          var previousQuestion = questionService.getLocalQuestion(),
            previousQuesionLevel = questionLevelService.getLocalQuestionLevel();

          switchLevelService
            .switchLevel(QUESTION_TYPE.a,LEVEL_TYPE.one)
            .then(shouldBeOK)
            .then(shouldMaintainTheSameQuestion)
            .then(shouldCreateNewLevel)
            .then(shouldFinishThePreviousLevel)
            .catch(shouldNotBeCalled)
            .finally(done);

          function shouldMaintainTheSameQuestion(value) {
            previousQuestion._id = questionService.getLocalQuestion()._id;
            previousQuestion._rev = questionService.getLocalQuestion()._rev;
            return value;
          }

          function shouldFinishThePreviousLevel() {
            return questionLevelDbService
              .getQuestionLevel(previousQuesionLevel._id)
              .then(function(value){
                console.log(value);
                expect(value.state).toEqual(STATE.finished);
                return value;
            });
          }

          function shouldCreateNewLevel(value){
            expect(questionLevelService.getLocalQuestionLevel().type).toBe(LEVEL_TYPE.one);
            return value;
          }
        });


    });

  });

}());
