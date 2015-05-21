/**
 * Created by guochen on 21/05/15.
 */

(function () {
  'use strict';
  angular.module('app.questionCommon')
    .factory('logQuestionExecutionService',logQuestionExecutionService);

  logQuestionExecutionService.$inject = ['readableLogService'];

  function logQuestionExecutionService(readableLogService){


    var logCommandAdd = function logCommandAdd(cmdListSize,cmdContent) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandAdd', {commandCount: cmdListSize, content: cmdContent})
      );
    };

    var logCommandRemove = function logCommandRemove(cmdListSize) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandRemove', {commandCount: cmdListSize})
      );
    };

    var logCommandExecution = function logCommandExecution() {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandExecute',{})
      );
    };

    var logCommandExecutionFinished = function logCommandExecutionFinished() {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandExecuteFinish',{})
      );
    };

    var logCommandExecutionError = function logCommandExecutionError(cmdContent) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandExecuteError', {content:cmdContent})
      );
    };

    var logCommandsExecution = function logCommandsExecution(cmdListSize) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandsExecute', {commandCount: cmdListSize})
      );
    };

    var logCommandsExecutionFinished = function logCommandsExecutionFinished(cmdListSize) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandsExecuteFinish', {commandCount: cmdListSize})
      );
    };

    var logCommandFromSelection = function logCommandFromSelection(from, to, idx) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandFromSelection', {from: from, to: to, idx: idx})
      );
    };

    var logCommandToSelection = function logCommandToSelection(from, to, idx) {
      readableLogService.saveLog(
        readableLogService.createCommandLog('commandToSelection', {from: from, to: to, idx: idx})
      );
    };


    var service = {
      logCommandAdd:logCommandAdd,
      logCommandRemove:logCommandRemove,
      logCommandExecution:logCommandExecution,
      logCommandExecutionFinished:logCommandExecutionFinished,
      logCommandExecutionError:logCommandExecutionError,
      logCommandsExecution:logCommandsExecution,
      logCommandsExecutionFinished:logCommandsExecutionFinished,
      logCommandFromSelection:logCommandFromSelection,
      logCommandToSelection:logCommandToSelection
    };

    return service;
  }
}());
