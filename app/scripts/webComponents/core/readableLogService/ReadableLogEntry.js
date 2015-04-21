/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.readableLog')
    .factory('ReadableLogEntry', ReadableLogEntry);

  function ReadableLogEntry() {

    var ReadableLogEntry = function ReadableLogEntry(init) {

      this._id = init.quiz + '_readableLogEntry_' + init.timeStamp + Math.random();
      this._rev = '';
      this.timeStamp = init.timeStamp;
      this.event = init.event;
      this.detail = init.detail;
      this.quiz = init.quiz;

    };

    return ReadableLogEntry;
  }

}());
