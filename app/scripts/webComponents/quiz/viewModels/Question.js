/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Question', Question);

  Question.$inject = ['STATE','DOC_TYPE'];
  function Question(STATE, DOC_TYPE) {

    var Question = function Question(init) {

      var args, now;
      args = init || {endTimeStamp: '', type: '', quiz: '', state: STATE.created, docType: DOC_TYPE.question};
      now = new Date().toJSON();

      this._id = 'question_' + now + Math.random();
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.type = args.type;
      this.state = args.state;
      this.quiz = args.quiz;
      this.docType = args.docType;

    };

    return Question;
  }

}());
