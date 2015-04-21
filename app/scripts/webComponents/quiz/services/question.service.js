/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionService', questionService);

  questionService.$inject = [
    'quizService',
    'Question',
    'questionDbService',
    'STATE',
    'DOC_TYPE',
    'readableLogService'];

  function questionService(quizService,
                           Question,
                           questionDbService,
                           STATE,
                           DOC_TYPE,
                           readableLogService) {

    //var _question = new Question();
    var _question;

    var _utils = {
      postProcess: _postProcess,
      updateQuestionStub: _updateQuestionStub,
      logQuestion: _logQuestion
    };

    var service = {
      getLocalQuestion: getLocalQuestion,
      createQuestion: createQuestion,
      finishQuestion: finishQuestion
    };
    return service;
    //////

    function getLocalQuestion() {
      return _question;
    }

    function createQuestion(questionType) {

      var quizId = quizService.getLocalQuiz()._id;

      _question = new Question({
        endTimeStamp: '',
        state: STATE.created,
        type: questionType,
        quiz: quizId,
        docType: DOC_TYPE.question
      });

      return questionDbService.putQuestion(_question)
        .then(_utils.postProcess);
    }

    function _postProcess(value) {
      var stub = _utils.updateQuestionStub(value);
      _utils.logQuestion();
      return stub;
    }

    function _logQuestion() {
      readableLogService.saveLog(
        readableLogService.createQuestionLog(_question)
      );
    }

    function _updateQuestionStub(stub) {
      _question._id = stub.id;
      _question._rev = stub.rev;
      return stub;
    }

    function finishQuestion() {
      _question.endTimeStamp = new Date().toJSON();
      _question.state = STATE.finished;
      return questionDbService.putQuestion(_question, _question._id, _question._rev)
        .then(_utils.postProcess);
    }
  }

}());
