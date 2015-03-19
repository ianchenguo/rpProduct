/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionLevelService', questionLevelService);

  questionLevelService.$inject = ['questionService', 'QuestionLevel', 'questionLevelDbService', 'STATE'];

  function questionLevelService(questionService, QuestionLevel, questionLevelDbService, STATE) {

    var _questionLevel = new QuestionLevel();

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

      var questionId = questionService.getLocalQuestion()._id;

      _questionLevel = new QuestionLevel({
        endTimeStamp: '',
        state: STATE.created,
        type: questionLevelType,
        question:questionId
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
