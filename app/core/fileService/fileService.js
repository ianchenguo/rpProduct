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
      createDir: createDir

    };
    return service;

    //////
    function createFile(path, fileName, canReplace) {
      //delegate to cordovaFile
      return $cordovaFile.createFile(path, fileName, canReplace)
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


    function checkFile(path, fileName) {
      //delegate to cordovaFile
      return $cordovaFile.checkFile(path, fileName)
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

    function getFile(path, fileName) {
      return cordovaFileExtension.getFile(path, fileName).then(handleSuccess, handleError);

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

    function checkDir(path, dir) {
      return $cordovaFile.checkDir(path, dir).then(handleSuccess, handleError);

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

    function createDir(path, dir, canReplace) {
      return $cordovaFile.createDir(path, dir, canReplace).then(handleSuccess, handleError);

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

  }
}());
