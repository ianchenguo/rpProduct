/**
 * Created by guochen on 27/02/15.
 */
(function(){
  'use strict';
  angular
    .module('app.core',[
      'ionic',
      'ngCordova',
      'pouchdb',

      'core.audioRecording',
      'core.file',
      'core.log',
      'core.replay',
      'core.db'
    ]);
}());
