/**
* Created by guochen on 15/03/15.
*/

(function () {
  'use strict';

  //tests questionLevelService
  describe('questionLevelService', function () {

    //prepares testing env
    var QuestionLevel, questionLevelService, questionService;
    beforeEach(module('app'));
    beforeEach(inject(function (_QuestionLevel_, _questionLevelService_, _questionService_) {
      QuestionLevel = _QuestionLevel_;
      questionLevelService = _questionLevelService_;
      questionService = _questionService_;
    }));

    //tests getLocalQuestionLevel() may be only for test purpose
    describe('getLocalQuestionLevel()', function () {
      it('should get the local QuestionLevel object', function () {
        expect(questionLevelService.getLocalQuestionLevel()).to.be.instanceof(QuestionLevel);
      });
    });

    //tests initQuestionLevel()
    describe('initQuestionLevel()', function () {

      it('should initialise local QuestionLevel object with passed in data', function () {
        questionLevelService.initQuestionLevel();
        expect(questionLevelService.getLocalQuestionLevel()).to.have.property('question')
          .that.equals(questionService.getLocalQuestion()._id);
      });

      it('should ceate a quiz document in database', function () {
        var promise = questionLevelService.initQuestionLevel();
        expect(promise).to.eventually.have.property('ok').that.equals(true);
      });
    });

    //tests getQuestionLevel()
    describe('getQuestionLevel()', function () {
      //we have a logic bug here
      it('should get quiz document by id and sync local QuestionLevel object with it', function () {
        var promise = questionLevelService.initQuestionLevel();
        promise.then(function(){
          var local = quizDbService.getLocalQuestionLevel();

          expect(questionLevelService.getQuestionLevel(local._id)).to.eventually.have.property('_rev')
            .that.equals(questionLevelService.getLocalQuestionLevel()._rev);
        });

      });
    });

  });
}());
