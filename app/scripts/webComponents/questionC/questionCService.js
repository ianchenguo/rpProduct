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



    var service = {
      storeCurrentCommands:storeCurrentCommands,
      retrievePreviousCommands:retrievePreviousCommands,
      storeCurrentLevel:storeCurrentLevel,
      retrievePreviousLevel:retrievePreviousLevel
    };


    return service;
  }



}());
