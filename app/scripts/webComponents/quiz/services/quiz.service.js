/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizService', quizService);

  quizService.$inject =
    [
      'Quiz',
      'Observer',
      'Child',
      'quizDbService',
      'STATE',
      'DOC_TYPE',
      'readableLogService'
    ];

  function quizService(Quiz,
                       Observer,
                       Child,
                       quizDbService,
                       STATE,
                       DOC_TYPE,
                       readableLogService) {

    var _quiz;
    var _utils = {
      createChild: _createChild,
      createObserver: _createObserver,
      postProcess: _postProcess,
      updateQuizStub: _updateQuizStub,
      logQuiz: _logQuiz
    };

    var service = {
      createQuiz: createQuiz,
      finishQuiz: finishQuiz,
      getLocalQuiz: getLocalQuiz,
      queryQuizzesByState: queryQuizzesByState
    };
    return service;
    //////

    function createQuiz(childData, observerData) {

      _quiz = new Quiz({
        endTimeStamp: '',
        state: STATE.created,
        observer: _utils.createObserver(observerData),
        child: _utils.createChild(childData),
        docType: DOC_TYPE.quiz
      });
      return quizDbService.putQuiz(_quiz).then(_utils.postProcess);
    }

    function _createChild(childData) {
      return new Child(childData);
    }

    function _createObserver(observerData) {
      return new Observer(observerData);
    }

    function _postProcess(response) {

      var stub = _updateQuizStub(response);

      _utils.logQuiz();
      return stub;
    }

    function _updateQuizStub(stub) {
      _quiz._id = stub.id;
      _quiz._rev = stub.rev;
      return stub;
    }

    function _logQuiz() {

      if (_quiz.state === STATE.created) {
        readableLogService.saveLogs(
          [readableLogService.createQuizLog(_quiz),
            readableLogService.createObserverLog(_quiz),
            readableLogService.createChildLog(_quiz)]
        );
      } else if (_quiz.state === STATE.finished) {
        readableLogService.saveLog(
          readableLogService.createQuizLog(_quiz)
        );
      }
    }

    function finishQuiz() {
      _quiz.endTimeStamp = new Date().toJSON();
      _quiz.state = STATE.finished;

      return quizDbService.putQuiz(_quiz, _quiz._id, _quiz._rev).then(_utils.postProcess);
    }

    function getLocalQuiz() {
      return _quiz;
    }

    function queryQuizzesByState(state) {
      return quizDbService.queryQuizzesByState(state);
    }
  }

}());
