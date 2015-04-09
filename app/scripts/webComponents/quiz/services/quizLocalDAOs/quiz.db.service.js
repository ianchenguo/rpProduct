/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.localDAO')
    .factory('quizDbService', quizDbService);

  quizDbService.$inject = ['dbService'];

  function quizDbService(dbService) {

    var service = {
      getQuiz: getQuiz,
      putQuiz: putQuiz,
      listAllQuizzes: listAllQuizzes,
      queryQuizzesByState: queryQuizzesByState,
      queryEndedQuizzesByDate: queryEndedQuizzesByDate
    };
    return service;
    //////

    function getQuiz(id) {
      return dbService.db
        .get(id)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function putQuiz(quiz) {
      return dbService.db
        .put(quiz)
        .then(function (value) {
          return value;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function listAllQuizzes() {
      return dbService.db.allDocs({
        include_docs: true,
        startkey: 'quiz',
        endkey: 'quiz\uffff'
      })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    //temporary implementation
    function queryQuizzesByState(state) {

      return dbService.db
        .query(function (doc) {
          if (doc.state === state) {
            emit(doc._id);
          }
        },
        {
          startkey: 'quiz',
          endkey: 'quiz\uffff',
          include_docs: true
        })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function queryEndedQuizzesByDate(startDate, endDate) {

      return dbService.db
        .query(function (doc) {
          if (doc.state === 'finished' && doc.docType === 'quiz') {
            emit(doc.endTimeStamp);
          }
        },
        {
          startkey: startDate,
          endkey: endDate,
          include_docs: true
        })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }


  }
}());
