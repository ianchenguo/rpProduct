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
        initialised: 'initialised',
        finalised: 'finalised'
      },
      GENDER: {
        male: 'male',
        female: 'female'
      }
    });
}());
