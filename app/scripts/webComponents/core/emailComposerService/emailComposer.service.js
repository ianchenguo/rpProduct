/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.emailComposer')
    .factory('emailComposerService', emailComposerService);

  emailComposerService.$inject = [
    '$cordovaEmailComposer',
    '$cordovaFile',
    'readableLogService',
    'audioRecordingService'];
  function emailComposerService($cordovaEmailComposer,
                                $cordovaFile,
                                readableLogService,
                                audioRecordingService) {

    var service = {
      openEmail: openEmail
    };

    return service;


    //////
    function openEmail(quizId) {
      var logFilePath = '';
      document.addEventListener("deviceready", function () {

        _fetchLogDocuments(quizId)
          .then(_createLogFile)
          .then(_checkEmailSettings)
          .then(_composeEmail)
          .catch(function (error) {
            alert('Cannot compose the email: ' + error);
          });

        //$cordovaEmailComposer
        //  .isAvailable()
        //  .then(_fetchLogDocuments(quizId))
        //  .then(_createLogFile)
        //  .then(_composeEmail)
        //  .catch(function (error) {
        //    // not available
        //    console.log(error);
        //    alert('email app/account is not available on this device.');
        //  });


        //////
        function _checkEmailSettings() {
          return $cordovaEmailComposer.isAvailable();
        }

        function _fetchLogDocuments(quizId) {
          console.log('quizId ' + quizId);
          return readableLogService.getQuizLogs(quizId)
            .then(function (value) {
              return value;
            });
        }

        function _createLogFile(value) {
          console.log('value: ' + value);

          var stringBuffer = readableLogService.createLogBuffer(value);
          console.log(stringBuffer);
          var formatter = R.pipe(R.replace(/:/g, '_'), R.replace(/-/g, '_'), R.replace(/\./g, '_'));
          var fileName = formatter(quizId) + '.txt';
          console.log(fileName);
          //return readableLogService.createLogFile(stringBuffer, fileName);
          return readableLogService
            .createLogFile(fileName, stringBuffer)
            .then(function (value) {
              logFilePath = value;
              return value;
            });
        }

        function _composeEmail() {
          var attachments = [logFilePath];

          var formatter = R.pipe(R.replace(/:/g, '_'), R.replace(/-/g, '_'), R.replace(/\./g, '_'));
          var fileName = formatter(quizId) + '.m4a';
          $cordovaFile.checkFile(cordova.file.documentsDirectory, fileName)
            .then(function (success) {
              // success
              attachments.push(cordova.file.documentsDirectory + fileName);
              compose(attachments);
            }, function (error) {
              // error
              compose(attachments);
            });

          //if(audioRecordingService.isRecorded) {
          //  attachments.push(audioRecordingService.getFilePath());
          //}

          function compose(attachments) {
            var email = {
              to: '',
              cc: '',
              bcc: [],
              attachments: attachments,
              subject: '[CE] quiz log for ' + quizId,
              body: 'quiz log for ' + quizId,
              isHtml: true
            };
            $cordovaEmailComposer
              .open(email)
              .then(function (value) {
                console.log(value);

              }, function (error) {
                // user cancelled email
                console.log(error);
              });
          }


        }

      }, false);
    }
  }

}());
