/**
 * Created by guochen on 6/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.readableLog')
    .factory('readableLogService', readableLogService);

  readableLogService.$inject = [
    'ReadableLogEntry',
    'READABLE_LOG_EVENTS',
    'READABLE_LOG_DETAIL_SUBJECT',
    'READABLE_LOG_DETAIL_PREP'
  ];
  function readableLogService(ReadableLogEntry,
                              READABLE_LOG_EVENTS,
                              READABLE_LOG_DETAIL_SUBJECT,
                              READABLE_LOG_DETAIL_PREP) {

    var memory = {
      dragStartParent: ''
    }

    var service = {

      createQuizLog: createQuizLog,
      createObserverLog: createObserverLog,
      createChildLog: createChildLog,
      createQuestionLog: createQuestionLog,
      createLevelLog: createLevelLog,
      createDragLog: createDragLog

    };
    return service;


    //////
    function createObserverLog(quiz) {

      return new ReadableLogEntry({
        timeStamp: quiz.startTimeStamp,
        event: READABLE_LOG_EVENTS.observerInfoStored,
        detail: _concatDetail(quiz.observer)
      });
    }


    function createChildLog(quiz) {
      return new ReadableLogEntry({
        timeStamp: quiz.startTimeStamp,
        event: READABLE_LOG_EVENTS.childInfoStored,
        detail: _concatDetail(quiz.child)
      });
    }


    function _concatDetail(infoObj) {
      var concatedString = '';
      var concatString = function (info) {
        return concatedString += info + ' ';
      };

      R.mapObj(concatString, infoObj);

      return concatedString.trim();
    }


    function createQuizLog(quiz) {
      var quizContent = {};

      var createQuizStartLog = function createQuizStartLog() {
        quizContent.timeStamp = quiz.startTimeStamp;
        quizContent.event = READABLE_LOG_EVENTS.quizStart;
        quizContent.detail = READABLE_LOG_DETAIL_SUBJECT.quiz + ' ' + quiz._id;
      };

      var createQuizEndLog = function createQuizStartLog() {
        quizContent.timeStamp = quiz.endTimeStamp;
        quizContent.event = READABLE_LOG_EVENTS.quizEnd;
        quizContent.detail = READABLE_LOG_DETAIL_SUBJECT.quiz + ' ' + quiz._id;
      };

      quiz.endTimeStamp === '' ? createQuizStartLog() : createQuizEndLog();
      return new ReadableLogEntry(quizContent);
    }


    function createQuestionLog(question) {
      var questionContent = {};

      var createQuestionStartLog = function createQuestionStartLog() {
        questionContent.timeStamp = question.startTimeStamp;
        questionContent.event = READABLE_LOG_EVENTS.questionStart;
        questionContent.detail = READABLE_LOG_DETAIL_SUBJECT.question + ' ' + question._id;
      };

      var createQuestionEndLog = function createQuestionStartLog() {
        questionContent.timeStamp = question.endTimeStamp;
        questionContent.event = READABLE_LOG_EVENTS.questionEnd;
        questionContent.detail = READABLE_LOG_DETAIL_SUBJECT.question + ' ' + question._id;
      };

      question.endTimeStamp === '' ? createQuestionStartLog() : createQuestionEndLog();
      return new ReadableLogEntry(questionContent);
    }


    function createLevelLog(level) {
      var levelContent = {};

      var createLevelStartLog = function createLevelStartLog() {
        levelContent.timeStamp = level.startTimeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelStart;
        levelContent.detail = READABLE_LOG_DETAIL_SUBJECT.level + ' ' + level._id;
      };

      var createLevelEndLog = function createLevelStartLog() {
        levelContent.timeStamp = level.endTimeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelEnd;
        levelContent.detail = READABLE_LOG_DETAIL_SUBJECT.level + ' ' + level._id;
      };

      var createLevelMatchedLog = function createLevelMatchedLog() {
        levelContent.timeStamp = level.timeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelMatched;
        levelContent.detail = READABLE_LOG_DETAIL_SUBJECT.level + ' ' + level._id;
      }

      if (level.timeStamp) {
        createLevelMatchedLog();
      } else {
        level.endTimeStamp === '' ? createLevelStartLog() : createLevelEndLog();
      }


      return new ReadableLogEntry(levelContent);
    }

    function createDragLog(drag) {
      var dragContent = {};

      //should minimise the redundancy here

      var createDragStartLog = function createDragStartLog() {
        dragContent.timeStamp = drag.timeStamp;
        dragContent.event = READABLE_LOG_EVENTS.dragStart;
        dragContent.detail =
          READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
          drag.elId + ' ' +
          READABLE_LOG_DETAIL_PREP.dragStart + ' ' +
          drag.fromParent;

        memory.dragStartParent = drag.fromParent;
      };

      var createDragEndLog = function createDragEndLog() {
        dragContent.timeStamp = drag.timeStamp;
        dragContent.detail =
          READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
          drag.elId + ' ' +
          READABLE_LOG_DETAIL_PREP.dragEnd + ' ' +
          drag.toParent;

        if (drag.isSucceeded) {
          dragContent.event = READABLE_LOG_EVENTS.dragEndSuccess;
        } else {
          dragContent.event = READABLE_LOG_EVENTS.dragEndFailed;
          dragContent.detail += ' ' + READABLE_LOG_DETAIL_PREP.dragFailed + ' ' + memory.dragStartParent;
        }

        memory.dragStartParent = '';
      };

      if (drag.evType === 'dragstart') {
        createDragStartLog();
      } else if (drag.evType === 'dragend') {
        createDragEndLog();
      }

      return new ReadableLogEntry(dragContent);
    }
  }
}());
