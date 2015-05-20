/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.viewModel')
    .factory('QuestionLevel', QuestionLevel);

  QuestionLevel.$inject = ['STATE', 'DOC_TYPE'];
  function QuestionLevel(STATE, DOC_TYPE) {

    var QuestionLevel = function QuestionLevel(init) {

      var args, now;
      args = init || {
        endTimeStamp: '',
        type: '',
        quiz: '',
        question: '',
        state: STATE.created,
        docType: DOC_TYPE.questionLevel
      };
      now = new Date().toJSON();

      //this._id = 'stage_' + now + Math.random();
      this._id = args.quiz + '_stage_' + now + Math.random();
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.type = args.type;
      this.state = args.state;
      this.quiz = args.quiz;
      this.question = args.question;
      this.docType = args.docType;

    };

    return QuestionLevel;
  }

}());
