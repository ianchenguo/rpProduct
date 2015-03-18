/**
 * Created by guochen on 3/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.file')
    .factory('cordovaFileExtension', cordovaFileExtension);

  cordovaFileExtension.$inject = ['$q', '$window', 'FILE_ERROR']
  function cordovaFileExtension($q, $window, FILE_ERROR) {
    var service = {
      getFile: getFile
    };
    return service;

    //////
    //get file object
    function getFile(path, fileName) {

      var q = $q.defer();

      if ((/^\//.test(fileName))) {
        q.reject("directory cannot start with \/")
      }

      try {
        var directory = path + fileName;
        console.log('directory: ' + directory);

        //fetch the file entry object
        $window.resolveLocalFileSystemURL(directory,
          function handleFileEntry(fileEntry) {
            //test the file entry
            if (fileEntry.isFile === true) {
              //fetch the file object
              fileEntry.file(handleFile, handleFileError);
            }
            else {
              q.reject({code: 13, message: "input is not a file"});
            }
          },
          function handleFileEntryError(error) {
            q.reject(error);
          });

      } catch (err) {
        err.message = FILE_ERROR[err.code];
        q.reject(err);
      }

      function handleFile(file) {
        q.resolve(file);
      }

      function handleFileError(error) {
        q.reject(error);
      }

      return q.promise;
    }

  }
}());
