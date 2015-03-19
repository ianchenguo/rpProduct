/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizDbService', quizDbService);

  quizDbService.$inject = ['dbService'];

  function quizDbService(dbService) {

    var service = {
      getQuiz: getQuiz,
      putQuiz: putQuiz,
      listQuizzes:listQuizzes
    };
    return service;
    //////

    function getQuiz(id) {
      return dbService.db.get(id);
    }

    function putQuiz(quiz) {
      return dbService.db.put(quiz);
    }

    function listQuizzes() {
      return dbService.db.allDocs({
        include_docs: true,
        attachments: true,
        startkey: 'quiz',
        endkey: 'quiz\uffff'
      });
    }
  }

}());
