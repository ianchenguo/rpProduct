/**
 * Created by guochen on 5/05/15.
 */

(function () {
  'use strict';

  angular
    .module('app.questionB')
    .factory('questionBService', questionBService);

  function questionBService() {

    var _storedCommands = [{from: '', to: ''}];
    var _storedLevel = 0;
    var _initState = [];

    var _commandHistory = [];

    var storeCurrentCommands = function storeCurrentCommands(cmds) {
      _storedCommands = R.clone(cmds);
      return R.clone(_storedCommands);
    };

    var retrievePreviousCommands = function retrievePreviousCommands() {
      return R.clone(_storedCommands);
    };

    var storeCurrentLevel = function storeCurrentLevel(lvl) {
      _storedLevel = lvl;
      return _storedLevel;
    };

    var retrievePreviousLevel = function retrievePreviousLevel() {
      return _storedLevel;
    };




    var addToCommandHistory = function addToCommandHistory(cmd) {
      _commandHistory.push(cmd);
    };

    var removeFromCommandHistory = function removeFromCommandHistory() {
      _commandHistory.pop();
    };

    var getCommandHistory = function getCommandHistory() {
      return R.clone(_commandHistory);
    };

    var clearCommandHistory = function clearCommandHistory() {
      _commandHistory = [];
    };

    var memoriseInitState = function memoriseInitState(deployedCards) {
      _initState = R.clone(deployedCards);
    };

    var moveBackToInitState = function moveBackToInitState() {
      $(document).ready(function () {
        _initState.forEach(function (el, idx) {
          var n = idx + 1;
          $('#droppable' + n).find('div').append($('.test-area').find('#' + el.id));
        })
      });
    };

    var service = {
      storeCurrentCommands:storeCurrentCommands,
      retrievePreviousCommands:retrievePreviousCommands,
      storeCurrentLevel:storeCurrentLevel,
      retrievePreviousLevel:retrievePreviousLevel,

      addToCommandHistory:addToCommandHistory,
      removeFromCommandHistory:removeFromCommandHistory,
      getCommandHistory:getCommandHistory,
      clearCommandHistory:clearCommandHistory,


      memoriseInitState: memoriseInitState,
      moveBackToInitState: moveBackToInitState
    };


    return service;
  }



}());
