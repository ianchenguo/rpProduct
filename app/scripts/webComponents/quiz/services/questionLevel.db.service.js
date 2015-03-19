/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionLevelDbService', questionLevelDbService);

  questionLevelDbService.$inject = ['dbService'];

  function questionLevelDbService(dbService) {

    var service = {
      getQuestionLevel: getQuestionLevel,
      putQuestionLevel: putQuestionLevel
    };
    return service;
    //////

    function getQuestionLevel(id) {
      return dbService.db.get(id);
    }

    function putQuestionLevel(questionLevel) {
      return dbService.db.put(questionLevel);
    }

  }

}());
