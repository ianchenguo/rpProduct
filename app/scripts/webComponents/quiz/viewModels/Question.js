/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Question', Question);

  function Question() {

    var Question = function Question(init) {

      var args, now;
      args = init || {endTimeStamp: '', state: '', type: '', quiz: ''};
      now = new Date().toJSON();

      this._id = 'question_' + now + Math.random();
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.type = args.type;
      this.state = args.state;
      this.quiz = args.quiz;
    };

    return Question;
  }

}());
