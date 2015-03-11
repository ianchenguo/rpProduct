/**
 * Created by guochen on 27/02/15.
 */
(function(){
  'use strict';
  angular
    .module('app.core',[
      'ionic',
      'ngCordova',
      //'placeholders.img',

      'core.audioRecording',
      'core.file',
      'core.log',
      'core.replay'
    ]);
}());
