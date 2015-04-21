/**
 * Created by guochen on 6/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.readableLog')
    .factory('readableLogService', readableLogService);

  readableLogService.$inject = [
    'readableLogDbService',
    'ReadableLogEntry',
    'READABLE_LOG_EVENTS',
    'READABLE_LOG_DETAIL_SUBJECT',
    'READABLE_LOG_DETAIL_PREP',
    'fileService'
  ];
  function readableLogService(readableLogDbService,
                              ReadableLogEntry,
                              READABLE_LOG_EVENTS,
                              READABLE_LOG_DETAIL_SUBJECT,
                              READABLE_LOG_DETAIL_PREP,
                              fileService) {

    var memory = {
      dragStartParent: '',
      quizId: ''
    };

    var service = {

      createQuizLog: createQuizLog,
      createObserverLog: createObserverLog,
      createChildLog: createChildLog,
      createQuestionLog: createQuestionLog,
      createLevelLog: createLevelLog,
      createDragLog: createDragLog,
      createLogBuffer: createLogBuffer,
      createLogFile: createLogFile,
      saveLog: saveLog,
      saveLogs: saveLogs,
      getQuizLogs: getQuizLogs

    };
    return service;


    //////
    function createQuizLog(quiz) {
      var quizContent = {};

      quizContent.quiz = memory.quizId = quiz._id;
      quizContent.detail = READABLE_LOG_DETAIL_SUBJECT.quiz + ' ' + quiz._id;

      var createQuizStartLog = function createQuizStartLog() {
        quizContent.timeStamp = quiz.startTimeStamp;
        quizContent.event = READABLE_LOG_EVENTS.quizStart;
      };

      var createQuizEndLog = function createQuizStartLog() {
        quizContent.timeStamp = quiz.endTimeStamp;
        quizContent.event = READABLE_LOG_EVENTS.quizEnd;
      };

      quiz.endTimeStamp === '' ? createQuizStartLog() : createQuizEndLog();
      return new ReadableLogEntry(quizContent);
    }


    function createObserverLog(quiz) {

      return new ReadableLogEntry({
        timeStamp: quiz.startTimeStamp,
        event: READABLE_LOG_EVENTS.observerInfoStored,
        detail: _concatPersonDetail(quiz.observer),
        quiz: memory.quizId
      });
    }


    function createChildLog(quiz) {
      return new ReadableLogEntry({
        timeStamp: quiz.startTimeStamp,
        event: READABLE_LOG_EVENTS.childInfoStored,
        detail: _concatPersonDetail(quiz.child),
        quiz: memory.quizId
      });
    }


    function _concatPersonDetail(infoObj) {
      var concatedString = '';
      var concatString = function (info) {
        return concatedString += info + ' ';
      };

      R.mapObj(concatString, infoObj);

      return concatedString.trim();
    }


    function createQuestionLog(question) {
      var questionContent = {};
      questionContent.quiz = memory.quizId;
      questionContent.detail = _concatStructuralDetail('question',question.type,question._id);


      var createQuestionStartLog = function createQuestionStartLog() {
        questionContent.timeStamp = question.startTimeStamp;
        questionContent.event = READABLE_LOG_EVENTS.questionStart;
      };

      var createQuestionEndLog = function createQuestionStartLog() {
        questionContent.timeStamp = question.endTimeStamp;
        questionContent.event = READABLE_LOG_EVENTS.questionEnd;
      };

      question.endTimeStamp === '' ? createQuestionStartLog() : createQuestionEndLog();
      return new ReadableLogEntry(questionContent);
    }


    function _concatStructuralDetail(subject, type, id) {
      return READABLE_LOG_DETAIL_SUBJECT[subject] + ' ' + type + ' ' + id;
    }


    function createLevelLog(level) {
      var levelContent = {};
      levelContent.quiz = memory.quizId;
      levelContent.detail = _concatStructuralDetail('level',level.type,level._id);

      var createLevelStartLog = function createLevelStartLog() {
        levelContent.timeStamp = level.startTimeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelStart;
      };

      var createLevelEndLog = function createLevelStartLog() {
        levelContent.timeStamp = level.endTimeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelEnd;
      };

      var createLevelMatchedLog = function createLevelMatchedLog() {
        levelContent.timeStamp = level.timeStamp;
        levelContent.event = READABLE_LOG_EVENTS.levelMatched;
      };

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
        dragContent.event = READABLE_LOG_EVENTS.dragStart;

        dragContent.detail =
          READABLE_LOG_DETAIL_SUBJECT.drag + ' ' +
          drag.elId + ' ' +
          READABLE_LOG_DETAIL_PREP.dragStart + ' ' +
          drag.fromParent;

        memory.dragStartParent = drag.fromParent;
      };

      var createDragEndLog = function createDragEndLog() {
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

      dragContent.quiz = memory.quizId;
      dragContent.timeStamp = drag.timeStamp;

      if (drag.evType === 'dragstart') {
        createDragStartLog();
      } else if (drag.evType === 'dragend') {
        createDragEndLog();
      }

      return new ReadableLogEntry(dragContent);
    }

    function saveLog(log) {
      return readableLogDbService.putReadableLogEntry(log);
    }

    function saveLogs(logs) {
      return readableLogDbService.bulkPutReadableLogEntry(logs);
    }


    function getQuizLogs(quizId) {

      return readableLogDbService
        .listAllReadableLogEntriesOfSingleQuiz(quizId)
        .then(_extractLogValue);

      function _extractLogValue(docs) {
        function extract(doc) {
          return doc.doc;
        }

        return docs.map(extract);
      }
    }


    function createLogBuffer(logObjects) {

      function formatLine(obj) {

        var withTrailing;
        var properties;

        function concatProps(result, prop) {
          return result + prop + '|';
        }

        properties = [obj.timeStamp, obj.event, obj.detail];
        withTrailing = properties.reduce(concatProps, '');
        return R.substringTo(withTrailing.length - 1, withTrailing) + '\n';
      }

      return logObjects.map(formatLine).toString();
    }


    function createLogFile(fileName, logBuffer) {
      return fileService
        .writeFile(cordova.file.dataDirectory, fileName, logBuffer, true)
        .then(function(){
          return cordova.file.dataDirectory + '/' + fileName;
        });
    }
  }
}());
