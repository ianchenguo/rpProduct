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
      getLastQuestionLevel: getLastQuestionLevel,
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

    function getLastQuestionLevel() {
      return dbService.db.allDocs({
        descending : true,
        include_docs: true,
        startkey: 'level\uffff',
        endkey: 'level',
        limit:1
      });

    }
  }

}());
