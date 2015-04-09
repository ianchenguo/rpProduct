/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.report.viewModel')
    .factory('ReportRecord', ReportRecord);

  function ReportRecord() {

    var ReportRecord = function ReportRecord(init) {
      this.timeStamp = init.timeStamp;
      this.subject = init.subject;
      this.detail = init.detail;
    };

    return ReportRecord;
  }

}());

