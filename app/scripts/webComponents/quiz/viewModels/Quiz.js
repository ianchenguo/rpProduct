/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Quiz', Quiz);

  Quiz.$inject = ['Question'];
  function Quiz(Question) {

    var Quiz = function Quiz(init) {

      var args, now;
      args = init || {endTimeStamp: '', state: '', questions: [], child: '', observer: '', device: ''};
      now = new Date().toJSON();

      this._id = 'quiz_' + now;
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.state = args.state;
      this.questions = args.questions;
      this.child = args.child;
      this.observer = args.observer;
      this.device = args.device;
    };

    Quiz.prototype.addQuestion = addQuestion;

    return Quiz;

    //////
    function addQuestion(question) {
      if (question instanceof Question) {
        this.questions.push(question);
      }
    }
  }

}());
