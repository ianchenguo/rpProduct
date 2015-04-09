/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.localDAO')
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
      return dbService.db
        .get(id)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function putQuestion(question) {
      return dbService.db
        .put(question)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }
  }

}());
