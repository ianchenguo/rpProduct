/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.common')
    .factory('QuestionLevel', QuestionLevel);

  function QuestionLevel() {

    var QuestionLevel = function QuestionLevel(init) {

      var args,now;
      args = init || {endTimeStamp: '', state: '', type: '', question: ''};
      now = new Date().toJSON();

      this._id = 'level_' + now;
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.type = args.type;
      this.state = args.state;
      this.question = args.question;
    };

    return QuestionLevel;
  }

}());
