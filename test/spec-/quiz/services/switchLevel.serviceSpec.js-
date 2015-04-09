/**
 * Created by guochen on 22/03/15.
 */

(function () {
  'use strict';

  describe('switchStageService', function () {

    var dbService,
      switchStageService,
      quizService,
      questionService,
      questionLevelService,
      questionLevelDbService,
      QUESTION_TYPE,
      LEVEL_TYPE,
      STATE;

    beforeEach(function () {

      var $injector = angular.injector(['ui.router', 'pouchdb', 'ng', 'core.db', 'app.quiz']);
      switchStageService = $injector.get('switchStageService');
      quizService = $injector.get('quizService');
      questionService = $injector.get('questionService');
      questionLevelService = $injector.get('questionLevelService');
      questionLevelDbService = $injector.get('questionLevelDbService');
      QUESTION_TYPE = $injector.get('QUESTION_TYPE');
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

    //stubs parent quiz id
    beforeEach(function () {
      spyOn(quizService,'getLocalQuiz').and.returnValue({_id:'dummy-quiz-id'});
    });

    describe('switchStage()', function () {


      function shouldNotBeCalled(rejection) {
        console.log(rejection);
        self.fail(rejection);
      }

      function shouldBeOK(response) {
        expect(response.ok).toBe(true);
        return response;
      }

      it('should create a new question and level 0 for the question' +
        ', if there is no question created'
        ,function(done){
          switchStageService
            .switchStage(QUESTION_TYPE.c)
            .then(shouldBeOK)
            .then(shouldCreateQuestionTypecLevelOne)
            .catch(shouldNotBeCalled)
            .finally(done);

          function shouldCreateQuestionTypecLevelOne(value) {
            expect(questionService.getLocalQuestion().type).toEqual(QUESTION_TYPE.c);
            expect(questionLevelService.getLocalQuestionLevel().type).toEqual(LEVEL_TYPE.zero);
            return value;
          }
        });

      it('should finish current level, create a new level and maintain current question,' +
        ' if the target level is within the same question'
        , function (done) {
          //console.log(questionService.getLocalQuestion());
          //console.log(questionLevelService.getLocalQuestionLevel());
          var previousQuestion,
            previousQuestionLevel;

          questionService
            .createQuestion(QUESTION_TYPE.a)
            .then(function () {
              return questionLevelService.createQuestionLevel(LEVEL_TYPE.zero);
            })
            .then(function (value) {
              //console.log(value);
              //console.log(questionService.getLocalQuestion());
              //console.log(questionLevelService.getLocalQuestionLevel());
              previousQuestion = questionService.getLocalQuestion();
              previousQuestionLevel = questionLevelService.getLocalQuestionLevel();
            }).then(function () {
              return switchStageService
                .switchStage(QUESTION_TYPE.a, LEVEL_TYPE.one);
            })
            .then(shouldBeOK)
            .then(shouldMaintainTheSameQuestion)
            .then(shouldFinishThePreviousLevel)
            .then(shouldCreateNewLevel)
            .catch(shouldNotBeCalled)
            .finally(done);

          function shouldMaintainTheSameQuestion(value) {
            expect(previousQuestion._id).toEqual(questionService.getLocalQuestion()._id);
            expect(previousQuestion._rev).toEqual(questionService.getLocalQuestion()._rev);
            return value;
          }

          function shouldFinishThePreviousLevel() {
            return questionLevelDbService
              .getQuestionLevel(previousQuestionLevel._id)
              .then(function (value) {
                //console.log(value);
                expect(value.state).toEqual(STATE.finished);
                return value;
              });
          }

          function shouldCreateNewLevel(value) {
            expect(questionLevelService.getLocalQuestionLevel().type).toBe(LEVEL_TYPE.one);
            return value;
          }
        });
    });

    //describe('resumeStage()', function () {
    //
    //
    //});
  });

}());
