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

    var _defaultFileSystem = '';

    var service = {
      setFileSystem: setFileSystem,
      createFile: createFile,
      checkFile: checkFile,
      getFile: getFile,
      checkDir: checkDir,
      createDir: createDir,
      createPath: createPath

    };
    return service;

    //////
    function setFileSystem(root) {
      _defaultFileSystem = root || cordova.file.documentsDirectory;
    }

    function createFile(fileSystem, fileName, canReplace) {
      var path = fileSystem || _defaultFileSystem;
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


    function checkFile(fileSystem, fileName) {
      var path = fileSystem || _defaultFileSystem;
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

    function getFile(fileSystem, fileName) {
      var path = fileSystem || _defaultFileSystem;

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

    function checkDir(fileSystem, dir) {
      var path = fileSystem || _defaultFileSystem;

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

    function createDir(fileSystem, dir, canReplace) {
      var path = fileSystem || _defaultFileSystem;

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

    function createPath(fileSystem, subPath) {
      var path = fileSystem || _defaultFileSystem;
      //
    }
  }
}());
