/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.readableLog')
    .constant({
      READABLE_LOG_EVENTS: {
        quizStart: 'quiz start',
        quizEnd: 'quiz end',
        observerInfoStored: 'observer info stored',
        childInfoStored: 'child info stored',
        questionStart: 'level start',
        questionEnd: 'level end',
        levelStart: 'stage start',
        levelMatched: 'stage match',
        levelEnd: 'stage end',
        dragStart: 'drag start',
        dragEndSuccess: 'succeeded drag end',
        dragEndFailed: 'failed drag end',
        commandAdd:'command added',
        commandRemove: 'command removed',
        commandExecute: 'command start executing',
        commandsExecute: 'command list start executing',
        commandExecuteError: 'command failed',
        commandExecuteFinish:'command executed',
        commandsExecuteFinish:'command list executed',
        commandsReload: 'commands reload',
        fromPositionSpecified:'from position specified',
        toPositionSpecified: 'to position specified',
        audioRecordingStart: 'audio recording started',
        audioRecordingFinished: 'audio recording finished'
      },
      READABLE_LOG_DETAIL_SUBJECT: {
        quiz: 'quiz',
        question: 'level',
        level: 'stage',
        drag: 'element',
        command:'command',
        fromPosition:'fromPosition',
        toPosition:'toPosition'
      },
      READABLE_LOG_DETAIL_PREP: {
        dragStart: 'FROM',
        dragEnd: 'TO',
        dragFailed: 'BACK'
      }
    });
}());
