/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.localDAO')
    .factory('reportDbService', reportDbService);

  reportDbService.$inject = ['dbService'];

  function reportDbService(dbService) {

    var service = {
      listAllEndedQuizzes:listAllEndedQuizzes,
      getQuizDetailById: getQuizDetailById
    };
    return service;
    //////

    function getQuizDetailById(id) {
      return dbService.db
        .query(function (doc) {

          if (doc.docType === "quiz") {
            emit([doc._id, null, null, 0]);
          } else if (doc.docType === "question") {
            emit([doc.quiz, doc._id, null, 1]);
          } else if (doc.docType === "questionLevel") {
            emit([doc.quiz, doc.question, doc._id, 2]);
          } else if (doc.docType === "directive") {
            emit([doc.quiz, doc.question, doc.questionLevel, 3]);
          }
        },
        {
          startkey: [id],
          endkey: [id, {}],
          include_docs: true
        })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function listAllEndedQuizzes() {
      return dbService.db
        .query(function (doc) {
          if (doc.state === 'finished' && doc.docType === 'quiz') {
            emit(doc.endTimeStamp);
          }
        },
        {
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

