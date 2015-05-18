/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionLevelService', questionLevelService);

  questionLevelService.$inject = [
    'quizService',
    'questionService',
    'QuestionLevel',
    'questionLevelDbService',
    'STATE',
    'DOC_TYPE',
    'readableLogService'];

  function questionLevelService(quizService,
                                questionService,
                                QuestionLevel,
                                questionLevelDbService,
                                STATE,
                                DOC_TYPE,
                                readableLogService) {

    var _questionLevel;

    var _utils = {
      postProcess:_postProcess,
      updateQuestionLevelStub: _updateQuestionLevelStub,
      logQuestionLevel:_logQuestionLevel
    };

    var service = {
      getLocalQuestionLevel: getLocalQuestionLevel,
      createQuestionLevel: createQuestionLevel,
      finishQuestionLevel: finishQuestionLevel
    };
    return service;
    //////

    function getLocalQuestionLevel() {
      return _questionLevel;
    }

    function createQuestionLevel(questionLevelType) {

      var quizId = quizService.getLocalQuiz()._id;
      var questionId = questionService.getLocalQuestion()._id;

      _questionLevel = new QuestionLevel({
        endTimeStamp: '',
        state: STATE.created,
        type: questionLevelType,
        quiz: quizId,
        question: questionId,
        docType: DOC_TYPE.questionLevel
      });

      return questionLevelDbService.putQuestionLevel(_questionLevel)
        .then(_utils.postProcess);
    }

    function _postProcess(value) {
      var stub = _utils.updateQuestionLevelStub(value);
      _utils.logQuestionLevel();
      return stub;
    }

    function _updateQuestionLevelStub(stub) {
      _questionLevel._id = stub.id;
      _questionLevel._rev = stub.rev;
      return stub;
    }

    function _logQuestionLevel() {
      readableLogService.saveLog(
        readableLogService.createLevelLog(_questionLevel)
      );
    }


    function finishQuestionLevel() {

      if(_questionLevel.state !== STATE.finished) {
        _questionLevel.endTimeStamp = new Date().toJSON();
        _questionLevel.state = STATE.finished;
        return questionLevelDbService.putQuestionLevel(_questionLevel, _questionLevel._id, _questionLevel._rev)
          .then(_utils.postProcess);
      }
    }
  }

}());
