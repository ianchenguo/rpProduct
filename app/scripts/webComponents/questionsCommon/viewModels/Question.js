/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.common')
    .factory('Question', Question);

  Question.$inject = ['QuestionLevel'];
  function Question(QuestionLevel) {

    var Question = function Question(init) {

      var args, now;
      args = init || {endTimeStamp: '', state: '', levels: [], type: '', quiz: ''};
      now = new Date().toJSON();

      this._id = 'question_' + now;
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.type = args.type;
      this.state = args.state;
      this.levels = args.levels;
      this.quiz = args.quiz;
    };

    Question.prototype.addLevel = addLevel;

    return Question;

    //////
    function addLevel(level) {
      if (level instanceof QuestionLevel) {
        this.levels.push(level);
      }
    }
  }

}());
