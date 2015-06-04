/**
 * Created by guochen on 28/02/15.
 */

(function () {
  'use strict';
  angular
    .module('core.file')
    .factory('fileService', fileService);

  fileService.$inject = ['$q', '$cordovaFile', 'cordovaFileExtension'];

  function fileService($q, $cordovaFile, cordovaFileExtension) {

    var service = {
      createFile: createFile,
      checkFile: checkFile,
      getFile: getFile,
      checkDir: checkDir,
      createDir: createDir,
      writeFile: writeFile,
      getAudioFilePath:getAudioFilePath,
      getLogFilePath:getLogFilePath,
      removeFile:removeFile

    };
    return service;

    //////

    function createFile(fileSystem, fileName, canReplace) {
      //delegate to cordovaFile
      return $cordovaFile.createFile(fileSystem, fileName, canReplace)
        .then(handleSuccess, handleError);

      //////
      function handleSuccess(value) {
        console.log('createFile() Success: ' + JSON.stringify(value));
        return value;
      }

      function handleError(error) {
        console.log('createFile() Error: ' + JSON.stringify(error));
        return $q.reject(error);
      }
    }


    function checkFile(fileSystem, fileName) {
      //delegate to cordovaFile
      return $cordovaFile.checkFile(fileSystem, fileName)
        .then(handleSuccess, handleError);

      //////
      function handleSuccess(fileEntry) {
        console.log('checkFile() Success: ' + JSON.stringify(fileEntry));
        return fileEntry;
      }

      function handleError(error) {
        console.log('checkFile() Error: ' + JSON.stringify(error));
        return $q.reject(error);
      }
    }

    function getFile(fileSystem, fileName) {

      return cordovaFileExtension.getFile(fileSystem, fileName).then(handleSuccess, handleError);

      //////
      function handleSuccess(value) {
        console.log('getFile() Success: ' + JSON.stringify(value));
        return value;
      }

      function handleError(error) {
        console.log('getFile() Error: ' + JSON.stringify(error));
        return $q.reject(error);
      }
    }

    function checkDir(fileSystem, dir) {

      return $cordovaFile.checkDir(fileSystem, dir).then(handleSuccess, handleError);

      //////
      function handleSuccess(value) {
        console.log('checkDir() Success: ' + JSON.stringify(value));
        return value;
      }

      function handleError(error) {
        console.log('checkDir() Error: ' + JSON.stringify(error));
        return $q.reject(error);
      }
    }

    function createDir(fileSystem, dir, canReplace) {

      return $cordovaFile.createDir(fileSystem, dir, canReplace).then(handleSuccess, handleError);

      //////
      function handleSuccess(value) {
        console.log('createDir() Success: ' + JSON.stringify(value));
        return value;
      }

      function handleError(error) {
        console.log('createDir() Error: ' + JSON.stringify(error));
        return $q.reject(error);
      }
    }


    function writeFile(fileSystem, fileName, data, replace) {

      return $cordovaFile.
        writeFile(fileSystem, fileName, data, replace)
        .then(function (value) {
          console.log('writeFile() Success: ' + JSON.stringify(value));
          return value;
        }, function (error) {
          console.log('writeFile() Error: ' + JSON.stringify(error));
          return $q.reject(error);
        });
    }

    function getAudioFilePath(quizId) {
      var formatter = _formatter();
      return formatter(quizId) + '.txt';
    }

    function getLogFilePath(quizId) {
      var formatter = _formatter();
      return formatter(quizId) + '.m4a';
    }

    function _formatter() {
      return R.pipe(R.replace(/:/g, '_'), R.replace(/-/g, '_'), R.replace(/\./g, '_'));
    }

    function removeFile(path){
      $cordovaFile.removeFile(cordova.file.documentsDirectory, path)
        .then(function (success) {
          // success
          console.log(JSON.stringify(success));
        }, function (error) {
          console.log(JSON.stringify(error));
        });
    }
  }
}());
