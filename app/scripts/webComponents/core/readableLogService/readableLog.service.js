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
      createCommandLog: createCommandLog,
      createAudioLog:createAudioLog,
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
        timeStamp: new Date().toJSON(),
        event: READABLE_LOG_EVENTS.observerInfoStored,
        detail: _concatPersonDetail(quiz.observer),
        quiz: memory.quizId
      });
    }


    function createChildLog(quiz) {
      return new ReadableLogEntry({
        timeStamp: new Date().toJSON(),
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
      questionContent.detail = _concatStructuralDetail('question', question.type, question._id);


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
      levelContent.detail = _concatStructuralDetail('level', level.type, level._id);

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
          drag.toParent || 'background';

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
        .writeFile(cordova.file.documentsDirectory, fileName, logBuffer, true)
        .then(function () {
          return cordova.file.documentsDirectory + '/' + fileName;
        });
    }

    function createCommandLog(type, detail) {
      var content = {};
      content.timeStamp = new Date().toJSON();
      content.quiz = memory.quizId;
      content.detail = _concatCommandLog(detail);

      switch (type) {
        case 'commandAdd':
          content.event = READABLE_LOG_EVENTS.commandAdd;
          break;

        case 'commandRemove':
          content.event = READABLE_LOG_EVENTS.commandRemove;
          break;

        case 'commandExecute':
          content.event = READABLE_LOG_EVENTS.commandExecute;
          break;

        case 'commandsExecute':
          content.event = READABLE_LOG_EVENTS.commandsExecute;
          break;

        case 'commandExecuteFinish':
          content.event = READABLE_LOG_EVENTS.commandExecuteFinish;
          break;

        case 'commandsExecuteFinish':
          content.event = READABLE_LOG_EVENTS.commandsExecuteFinish;
          break;

        case 'commandsReload':
          content.event = READABLE_LOG_EVENTS.commandsReload;
          break;

        case 'commandFromSelection':
          content.event = READABLE_LOG_EVENTS.fromPositionSpecified;
          content.detail = _concatCommandPositionLog(detail.from, detail.to, detail.idx);
          break;

        case 'commandToSelection' :
          content.event = READABLE_LOG_EVENTS.toPositionSpecified;
          content.detail = _concatCommandPositionLog(detail.from, detail.to, detail.idx);
          break;

        case 'commandExecuteError' :
          content.event = READABLE_LOG_EVENTS.commandExecuteError;

          content.detail = _concatCommandErrorLog(detail.content.from,
            detail.content.to, detail.content.idx, detail.content.content);
          break;


      }

      return new ReadableLogEntry(content);
    }

    function _concatCommandLog(content) {
      //requires refactor
      var c = content.content ? 'command: ' + content.content : '';
      var c1 = content.commandCount ? 'command list size: ' + content.commandCount : '';

      var c2 = '';

      if (R.isEmpty(c) && !R.isEmpty(c1)) c2 = c;
      if (!R.isEmpty(c) && !R.isEmpty(c1)) c2 = c + ' ' + c1;
      if (!R.isEmpty(c) && R.isEmpty(c1)) c2 = c1;

      return c2;
    }

    function _concatCommandPositionLog(from, to, idx) {
      var f = R.isEmpty(from) ? 'empty' : to;
      var t = R.isEmpty(to) ? 'empty' : to;

      return 'command index: ' + idx + ' content: from ' + f + ' to ' + t;
    }

    function _concatCommandErrorLog(from,to,idx,content) {

      if(R.isNil(content)){
        return _concatCommandPositionLog(from,to,idx);
      } else {
        return 'command index: ' + idx + ' content: ' + content;
      }
    }

    function createAudioLog(type){
      var content = {};
      content.timeStamp = new Date().toJSON();
      content.quiz = memory.quizId;

      switch (type) {
        case 'audioRecordingStart':
          content.event = READABLE_LOG_EVENTS.audioRecordingStart;
          break;

        case 'audioRecordingFinished':
          content.event = READABLE_LOG_EVENTS.audioRecordingFinished;
          break;
      }

      return new ReadableLogEntry(content);
    }
  }
}());
