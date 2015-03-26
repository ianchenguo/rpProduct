/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .constant({
      STATE: {
        created: 'created',
        finished: 'finished'
      },
      GENDER: {
        male: 'male',
        female: 'female'
      },
      QUESTION_TYPE: {
        a: 'a',
        b: 'b',
        c: 'c'
      },
      LEVEL_TYPE: {
        zero: 0,
        one: 1,
        two: 2
      },
      DOC_TYPE: {
        quiz: 'quiz',
        question: 'question',
        questionLevel: 'questionLevel',
        directive: 'directive'
      }
    });
}());
