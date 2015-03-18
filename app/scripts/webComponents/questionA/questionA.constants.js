/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.questions.questionA')
    .constant({
      QUESTION_TYPE: {
        a: 'a',
        b: 'b',
        c: 'c'
      },
      LEVEL_TYPE: {
        zero: 0,
        one: 1,
        two: 2
      }
    });
}());
