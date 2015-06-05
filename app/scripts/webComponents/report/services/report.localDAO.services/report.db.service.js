/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.localDAO')
    .factory('reportDbService', reportDbService);

  reportDbService.$inject = ['$q', 'dbService'];

  function reportDbService($q, dbService) {

    var service = {
      listAllEndedQuizzes: listAllEndedQuizzes,
      getQuizDetailById: getQuizDetailById,
      listAllDocOfQuiz: listAllDocOfQuiz,
      deleteDocsOfQuiz: deleteDocsOfQuiz,
      compactDatabase: compactDatabase
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


      // create a design doc
      var ddoc = {
        _id: '_design/report_quiz_index',
        views: {
          by_state_and_docType: {
            map: function (doc) {
              emit([doc.state, doc.docType]);
            }.toString()
          },
          by_docType_and_state: {
            map: function (doc) {
              emit([doc.docType, doc.state]);
            }.toString()
          }
        }
      };

      // save the design doc
      return dbService.db
        .put(ddoc).catch(function (err) {
          if (err.status !== 409) {
            throw err;
          }
          // ignore if doc already exists
        })
        .then(function () {

          return dbService.db
            .query('report_quiz_index/by_docType_and_state', {
              include_docs: true,
              key: ['quiz', 'finished']
            });
        }).then(function (value) {
          // handle result
          return value.rows;
        }).catch(function (error) {
          throw new Error(error);
        });
    }

    function listAllDocOfQuiz(quizId) {

      return dbService.db.allDocs({
        include_docs: true,
        startkey: quizId,
        endkey: quizId + '\uffff'
      })
        .then(function (value) {
          return value.rows;
        })
        .catch(function (error) {
          throw new Error(error);
        });
    }

    function deleteDocsOfQuiz(quizId) {
      return listAllDocOfQuiz(quizId)
        .then(function (values) {
          var docs = values.map(function (doc) {
            doc.doc._deleted = true;
            return doc.doc;
          });


          return dbService.db.bulkDocs(docs);
        })
        //.then(function () {
        //  return dbService.db.compact();
        //})
        .catch(function (error) {
          return $q.reject(error);
        })
    }

    function compactDatabase(){
      return dbService.db.compact();
    }

  }
}());

