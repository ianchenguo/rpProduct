/**
 * Created by guochen on 27/02/15.
 */

(function () {
  angular
    .module('core.audioRecording')
    .factory('audioRecordingService', audioRecordingService);

  audioRecordingService.$inject = ['$q','$ionicPlatform', '$cordovaMedia'];

  function audioRecordingService($q,$ionicPlatform, $cordovaMedia) {

    var src, media;

    var service = {
      startRecord: startRecord,
      stopRecord: stopRecord,
      play: play,
      stop:stop
    };

    return service;

    ///////
    function startRecord(path) {

      console.log('i am in start record');
      src = path;
      console.log(prepareMedia(src));
      console.log('outer');
      console.log(media);
      media.startRecord();
      console.log(media);
    }

    function stopRecord(){

      console.log('stop record:');
      media.stopRecord();
      console.log(media);

      console.log('release media');
      media.release();
      console.log(media);
    }

    function play(){
      console.log('play record');
      prepareMedia();
      media.play();
    }

    function stop(){
      console.log('play record');
      media.stop();
      media.release();
    }

    function prepareMedia() {
      $ionicPlatform.ready(function () {
        console.log('hardware ready');
        media =  $cordovaMedia.newMedia('documents://test.m4a');
        return media.then(function (success) {
          // success
          console.log('newMedia(): Media success');
          return success;
        }, function (error) {
          // error
          console.log('newMedia(): Media error: ' + error);
          return $q.reject(error);
        });

        //console.log('hardware ready');
        //media = new Voice('test.amr',handleSuccess,handleError,handleStatus);
        ////////
        //
        //function handleSuccess(value) {
        //  console.log('voice success: ' + JSON.stringify(value));
        //}
        //
        //function handleError(error) {
        //  console.log('voice error: ' + JSON.stringify(error));
        //}
        //
        //function handleStatus(status) {
        //  console.log('voice status: ' + JSON.stringify(status));
        //}
      });
    }
  }
}());
