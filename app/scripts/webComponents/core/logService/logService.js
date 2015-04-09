/**
 * Created by guochen on 6/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.log')
    .factory('logService', logService);

  logService.$inject = ['quizService','questionService', 'Directive', 'questionLevelService', 'STATE', 'directiveDbService', 'DOC_TYPE'];
  function logService(quizService, questionService, Directive, questionLevelService, STATE, directiveDbService, DOC_TYPE) {

    var _directive;

    var _utils = {
      initDirective: _initDirective,
      pushTouch: _pushTouch,
      finishDirective: _finishDirective,
      persistDirective: _persistDirective,
      updateDirectiveStub: _updateDirectiveStub
    }

    var service = {
      getCurrentDirective: getCurrentDirective,
      logTouch: logTouch
    }
    return service;

    //////
    function getCurrentDirective() {
      return _directive;
    }

    function logTouch(touch) {
      if (touch.evType === 'dragstart') {
        _utils.initDirective();
      }

      _utils.pushTouch(touch);

      if (touch.evType === 'dragend') {
        _utils.finishDirective();
        return _utils.persistDirective();
      }
    }

    function _initDirective() {

      var quizId = quizService.getLocalQuiz()._id;
      var questionId = questionService.getLocalQuestion()._id;
      var questionLevelId = questionLevelService.getLocalQuestionLevel()._id;

      _directive = new Directive({
        endTimeStamp: '',
        touches: [],
        quiz:quizId,
        question:questionId,
        questionLevel: questionLevelId,
        state: STATE.created,
        docType:DOC_TYPE.directive});
    }

    function _pushTouch(touch) {
      _directive.touches.push(touch);
    }

    function _finishDirective() {
      _directive.endTimeStamp = new Date().toJSON();
      _directive.state = STATE.finished;
    }

    function _persistDirective() {
      return directiveDbService
        .putDirective(_directive)
        .then(_updateDirectiveStub);
    }

    function _updateDirectiveStub(stub) {
      _directive._id = stub.id;
      _directive._rev = stub.rev;
      return stub;
    }
  }
}());
