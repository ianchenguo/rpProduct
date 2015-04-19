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
      'ngMaterial',
      'ngMessages',

      'core.audioRecording',
      'core.file',
      'core.log',
      'core.readableLog',
      'core.replay',
      'core.db'
    ]);

}());
