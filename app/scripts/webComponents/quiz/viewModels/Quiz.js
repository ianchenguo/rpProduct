/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Quiz', Quiz);

  function Quiz() {

    var Quiz = function Quiz(init) {

      var args = init || {endTimeStamp: '', state: '', child: '', observer: ''},
        now = new Date().toJSON();

      this._id = 'quiz_' + now + Math.random();
      this._rev = '';
      this.startTimeStamp = now;
      this.endTimeStamp = args.endTimeStamp;
      this.state = args.state;
      this.child = args.child;
      this.observer = args.observer;
    };
    return Quiz;
  }
}());
