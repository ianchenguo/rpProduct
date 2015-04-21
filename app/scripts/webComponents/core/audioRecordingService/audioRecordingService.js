/**
 * Created by guochen on 27/02/15.
 */

(function () {
  angular
    .module('core.audioRecording')
    .factory('audioRecordingService', audioRecordingService);

  audioRecordingService.$inject = ['$q', '$ionicPlatform', '$cordovaMedia', '$cordovaFile', 'quizService'];

  function audioRecordingService($q, $ionicPlatform, $cordovaMedia,$cordovaFile, quizService) {

    var _src;
    var _media;
    var _isRecording = false;
    var _isRecorded = false;
    var _fileRawPath = '';

    var service = {
      isRecording: isRecording,
      isRecorded: isRecorded,
      startRecord: startRecord,
      stopRecord: stopRecord,
      play: play,
      stop: stop,
      getFilePath: getFilePath
    };

    return service;


    ///////
    function getFilePath() {
      var fileName = R.replace(/^documents:\/\//, '', _fileRawPath);
      console.log(fileName);
      return cordova.file.documentsDirectory + fileName;
    }

    function isRecording() {
      return _isRecording;
    }

    function isRecorded() {
      return _isRecorded;
    }

    function startRecord(path) {

      _src = path;
      prepareMedia(_src);
      _media.startRecord();
      _fileRawPath = _media.media.src;
      _isRecording = true;
    }

    function stopRecord() {

      _media.stopRecord();
      _media.release();
      _isRecording = false;
      _isRecorded = true;

      var quizId = quizService.getLocalQuiz()._id;
      var formatter = R.pipe(R.replace(/:/g, '_'), R.replace(/-/g, '_'), R.replace(/\./g, '_'));
      var fileName = formatter(quizId) + '.m4a';

      return $cordovaFile.moveFile(cordova.file.documentsDirectory, "tempQuizAudio.m4a",
        cordova.file.documentsDirectory, fileName)
        .then(function (success) {
          // success
          console.log(JSON.stringify(success));
        }, function (error) {
          // error
          console.log(JSON.stringify(error));
        });

    }

    function play() {
      console.log('play record');
      prepareMedia();
      _media.play();
    }

    function stop() {
      console.log('play record');
      _media.stop();
      _media.release();
    }

    function prepareMedia(src) {
      $ionicPlatform.ready(function () {
        _media = $cordovaMedia.newMedia(src);
        return _media.then(
          function (success) {
            // success
            return success;
          },
          function (error) {
            // error
            console.log('newMedia(): Media error: ' + error);
            return $q.reject(error);
          });
      });
    }
  }
}());
