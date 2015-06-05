/**
 * Created by guochen on 9/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report')
    .factory('reportService', reportService);

  reportService.$inject = ['DOC_TYPE', 'STATE', 'quizDbService', 'ReportRecord', 'reportDbService', 'readableLogService'];
  function reportService(DOC_TYPE, STATE, quizDbService, ReportRecord, reportDbService, readableLogService) {
    var service = {
      listAllEndedQuizzes: listAllEndedQuizzes,
      createReport: createReport,
      getQuizDetail: getQuizDetail,
      loadSingQuizReport: loadSingQuizReport,
      getAllDocsOfQuiz: getAllDocsOfQuiz,
      deleteAllDocsOfQuiz:deleteAllDocsOfQuiz,
      compactDatabase:compactDatabase
    };

    return service;
    //////

    function createReport(rawData) {

      var tempQuizRecords = [];
      var tempQuestionRecords = [];
      var tempQuestionLevelRecords = [];
      var reportRecords = [];

      for (var i = 0; i < rawData.length; i++) {

        var docData = rawData[i].doc;

        if (docData.docType === 'quiz') {
          extractQuizRecord(docData);
          reportRecords.push(tempQuizRecords.shift());
        }

        if (docData.docType === 'question') {
          extractQuestionRecord(docData);

          if (tempQuestionRecords[0].detail.match(/end$/)) {
            reportRecords.push(tempQuestionRecords.shift());
            reportRecords.push(tempQuestionRecords.shift());
          } else {
            reportRecords.push(tempQuestionRecords.shift());
          }
        }

        if (docData.docType === 'questionLevel') {
          extractQuestionLevelRecord(docData);

          if (tempQuestionLevelRecords[0].detail.match(/end$/)) {
            reportRecords.push(tempQuestionLevelRecords.shift());
            reportRecords.push(tempQuestionLevelRecords.shift());
          } else {
            reportRecords.push(tempQuestionLevelRecords.shift());
          }
        }

        if (docData.docType === 'directive') {
          extractDirectiveRecord(docData);
        }

        //puts the last record to the quiz report
        if (i === rawData.length - 1) {

          if (tempQuestionLevelRecords.length) {
            reportRecords.push(tempQuestionLevelRecords.shift());
          }
          if (tempQuestionRecords.length) {
            reportRecords.push(tempQuestionRecords.shift());
          }
          reportRecords.push(tempQuizRecords.shift());
        }
      }

      return reportRecords;
      //////

      function extractQuizRecord(value) {

        tempQuizRecords.push(new ReportRecord({
          timeStamp: new Date(value.startTimeStamp),
          subject: value.docType,
          detail: value.docType + ' start'
        }));

        tempQuizRecords.push(new ReportRecord({
          timeStamp: new Date(value.endTimeStamp),
          subject: value.docType,
          detail: value.docType + ' end'
        }));
      }

      function extractQuestionRecord(value) {

        tempQuestionRecords.push(
          new ReportRecord({
            timeStamp: new Date(value.startTimeStamp),
            subject: value.docType + '-' + value.type,
            detail: value.docType + '-' + value.type + ' start'
          }));

        tempQuestionRecords.push(
          new ReportRecord({
            timeStamp: new Date(value.endTimeStamp),
            subject: value.docType + '-' + value.type,
            detail: value.docType + '-' + value.type + ' end'
          }));
      }


      function extractQuestionLevelRecord(value) {
        tempQuestionLevelRecords.push(
          new ReportRecord({
            timeStamp: new Date(value.startTimeStamp),
            subject: value.docType + '-' + value.type,
            detail: value.docType + '-' + value.type + ' start'
          }));

        tempQuestionLevelRecords.push(
          new ReportRecord({
            timeStamp: new Date(value.endTimeStamp),
            subject: value.docType + '-' + value.type,
            detail: value.docType + '-' + value.type + ' end'
          }));
      }

      function extractDirectiveRecord(value) {

        var touches;
        var tempTouchStart;

        function isStartOrEnd(touch) {
          return touch.evType === 'dragstart' || touch.evType === 'dragend';
        }

        touches = value.touches.filter(isStartOrEnd);
        touches.forEach(function (touch) {

          if (touch.evType === 'dragstart') {
            tempTouchStart = touch;
          }

          var record = new ReportRecord({
            timeStamp: new Date(touch.timeStamp),
            subject: touch.elId,
            detail: touch.evType + ' on ' + touch.elId + ' at x: ' + touch.x + ' y: ' + touch.y
          });

          reportRecords.push(record);

          if (!touch.success) {
            var record = new ReportRecord({
              subject: touch.elId,
              detail: 'rollback' + ' on ' + touch.elId + ' at x: ' + tempTouchStart.x + ' y: ' + tempTouchStart.y
            });
            reportRecords.push(record);
          }
        });
      }
    }

    function listAllEndedQuizzes() {
      return quizDbService.listAllQuizzes().then(
        function (value) {
          var filtered = value.filter(function (el) {
            return el.doc.docType === DOC_TYPE.quiz;
          });

          return R.clone(filtered);
        }
      );
    }

    function getQuizDetail(id) {
      return reportDbService.getQuizDetailById(id);
    }

    function loadSingQuizReport(quizId) {
      return readableLogService.getQuizLogs(quizId);
    }

    function getAllDocsOfQuiz(quizId) {
      return reportDbService.listAllDocOfQuiz(quizId);
    }

    function deleteAllDocsOfQuiz(quizId) {
      return reportDbService.deleteDocsOfQuiz(quizId);
    }

    function compactDatabase(){
      return reportDbService.compactDatabase();
    }
  }
}());
