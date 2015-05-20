/**
 * Created by guochen on 5/05/15.
 */

(function () {
  'use strict';

  angular
    .module('app.questionC')
    .factory('questionCService', questionCService);

  function questionCService() {

    var _commands = [];
    var _commandHistory = [];
    var _disableAdd = false;
    var _initState = [];


    var QuestionCCommand = function (args) {
      this.type = args.type;
      this.text = args.text;
      this.pressed = args.pressed;
      this.func = args.func;
    };


    var addCommand = function addCommand() {
      return RF.IO(function (cmd) {
        var newCmd = new QuestionCCommand(cmd);
        _commands = R.append(newCmd, _commands);
        return newCmd;
      });
    };

    var removeLastCommand = function removeLastCommand() {
      return RF.IO(function () {
        _commands = R.init(_commands);
        return R.clone(_commands);
      });
    };

    var getCommands = function getCommands() {
      return RF.IO(function () {
        return R.clone(_commands);
      });
    };

    var emptyCommands = function emptyCommands() {
      return RF.IO(function () {
        _commands = [];
        return R.clone(_commands);
      });
    };

    var addToCommandHistory = function addToCommandHistory(cmd) {
      _commandHistory.push(cmd);
      console.log(_commandHistory);
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

    var toggleDisableAdd = function toggleDisableAdd() {
      _disableAdd = !_disableAdd;
    };

    var enableAdd = function enableAdd() {
      _disableAdd = false;
    };

    var disableAdd = function disableAdd() {
      _disableAdd = true;
    };

    var getDisableAdd = function getDisableAdd() {
      return _disableAdd;
    };

    var memoriseInitState = function memoriseInitState(deployedCards) {
      _initState = R.clone(deployedCards);
    };

    var moveBackToInitState = function moveBackToInitState() {
      $(document).ready(function () {
        _initState.forEach(function (el, idx) {
          var n = idx + 1;
          console.log('wawawawawa');
          //console.log($('.test-area').find('#'+el.id));
          $('#droppable' + n).find('div').append($('.test-area').find('#' + el.id));

        })
      });
    };

    var service = {
      addCommand: addCommand,
      removeLastCommand: removeLastCommand,
      getCommands: getCommands,
      emptyCommands: emptyCommands,

      addToCommandHistory: addToCommandHistory,
      removeFromCommandHistory: removeFromCommandHistory,
      getCommandHistory: getCommandHistory,
      clearCommandHistory: clearCommandHistory,

      toggleDisableAdd: toggleDisableAdd,
      enableAdd:enableAdd,
      disableAdd:disableAdd,
      getDisableAdd: getDisableAdd,

      memoriseInitState: memoriseInitState,
      moveBackToInitState: moveBackToInitState
    };


    return service;
  }


}());
