/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizDbService', quizDbService);

  quizDbService.$inject = ['Quiz','dbService'];

  function quizDbService(Quiz,dbService) {

    var service = {
      getQuiz: getQuiz,
      createQuiz: createQuiz
    };
    return service;
    //////

    function getQuiz(id) {
      return dbService.db.get(id);
    }

    function createQuiz(quiz) {
      return dbService.db.put(quiz);
    }

  }

}());
