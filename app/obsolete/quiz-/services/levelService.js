/**
 * Created by guochen on 12/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions')
    .factory('levelService', levelService);

  function levelService() {

    var _level;
    var _utils = {
      checkLevel:_checkLevel,
      createLevel:_createLevel,
      Level:_Level
    };

    var service = {
      getLevel: getLevel,
      clearLevel: clearLevel,
      initLevel: initLevel,
      finaliseLevel: finaliseLevel
    }

    return service;

    //////

    function getLevel() {
      _utils.checkLevel();
      return _level;
    }

    /**
     * @ngdoc method
     * @name _checkLevel
     * @methodOf app.questionCommon.levelService
     * @private
     * @description
     * lazily calls _createLevel() to instantiates _level with an empty _Level object, if _level is null
     */
    function _checkLevel() {
      if (!_level) {
        _utils.createLevel();
      }
    }

    /**
     * @ngdoc method
     * @name _createLevel
     * @methodOf app.questionCommon.levelService
     * @private
     * @description
     * instantiates _level with an empty _Level object
     */
    function _createLevel() {
      _level = new _utils.Level({id: '', startTimeStamp: '', endTimeStamp: '', type: ''});
    }

    /**
     * @ngdoc constructor
     * @name _Level
     * @description
     * Represents a question level.
     * @constructor
     * @param {string} title - The title of the book.
     * @param {string} author - The author of the book.
     */
    function _Level(init) {
      this.id = init.id;
      this.startTimeStamp = init.startTimeStamp;
      this.endTimeStamp = init.endTimeStamp;
      this.type = init.type;
    }

    /**
     * @ngdoc method
     * @name clearLevel
     * @methodOf app.questionCommon.levelService
     * @description
     * replaces _level with a new empty _Level object
     *
     * @param
     * @returns
     */
    function clearLevel() {
      _utils.createLevel();
    }

    function initLevel(init) {
      _utils.createLevel();
      var now = Date.now();
      _level.id = now;
      _level.startTimeStamp = now;
      _level.type = init.type;
    }

    function finaliseLevel() {
    }
  }

}());
