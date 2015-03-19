/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('questionDbService', questionDbService);

  questionDbService.$inject = ['dbService'];

  function questionDbService(dbService) {

    var service = {
      getQuestion: getQuestion,
      putQuestion: putQuestion
    };
    return service;
    //////

    function getQuestion(id) {
      return dbService.db.get(id);
    }

    function putQuestion(question) {
      return dbService.db.put(question);
    }
  }

}());
