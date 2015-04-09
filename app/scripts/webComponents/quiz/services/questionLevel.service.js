/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionLevelService', questionLevelService);

  questionLevelService.$inject = ['quizService','questionService', 'QuestionLevel', 'questionLevelDbService', 'STATE', 'DOC_TYPE'];

  function questionLevelService(quizService, questionService, QuestionLevel, questionLevelDbService, STATE,DOC_TYPE) {

    var _questionLevel;

    var _utils = {
      updateQuestionLevelStub:_updateQuestionLevelStub
    }

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
      console.log('quizId: ' + quizId);

      _questionLevel = new QuestionLevel({
        endTimeStamp: '',
        state: STATE.created,
        type: questionLevelType,
        quiz:quizId,
        question:questionId,
        docType: DOC_TYPE.questionLevel
      });

      return questionLevelDbService.putQuestionLevel(_questionLevel)
        .then(_utils.updateQuestionLevelStub);
    }

    function _updateQuestionLevelStub(stub){
      _questionLevel._id = stub.id;
      _questionLevel._rev = stub.rev;
      return stub;
    }


    function finishQuestionLevel() {
      _questionLevel.endTimeStamp = new Date().toJSON();
      _questionLevel.state = STATE.finished;
      return questionLevelDbService.putQuestionLevel(_questionLevel, _questionLevel._id, _questionLevel._rev)
        .then(_utils.updateQuestionLevelStub);
    }
  };

}());
