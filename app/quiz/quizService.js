/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizService', quizService);

  quizService.$inject = ['$ionicPlatform', '$cordovaDevice', 'fileService'];

  function quizService($ionicPlatform, $cordovaDevice, fileService) {

    var _quiz = {
      id: '',
      info: ''
    };

    var service = {
      getQuiz: getQuiz,
      initQuiz: initQuiz
    };
    return service;
    //////

    //initialise a quiz
    function initQuiz(init) {
      //create a quiz object
      _quiz = new _Quiz(init);
      //persist the quiz object
      $ionicPlatform.ready(function () {
        _populateDeviceInfo();
        return _persistQuizInfo();
      })
    }

    function _populateDeviceInfo() {
      _quiz.info.device.uuid = $cordovaDevice.getUUID();
      _quiz.info.device.platform = $cordovaDevice.getPlatform();
    }

    function _Observer(init) {
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
    }

    function _Child(init) {
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.age = init.age;
      this.gender = init.gender;
    }

    function _Device(){
      this.uuid = '';
      this.platform = '';
    }

    function _Info(init) {
      this.observer = new _Observer(init.observer);
      this.child = new _Child(init.child);
      this.device = new _Device();
    }

    function _Quiz(init) {
      this.id = Date.now();

      this.info = new _Info(init);
    }

    function _persistQuizInfo() {

      var fileSystem = cordova.file.documentsDirectory,
        baseDir = 'quizzes',
        subDir = _quiz.id,
        relativePath = baseDir + '/' + subDir,
        fileName = 'quizInfo.txt';

      //console.log(relativePath + '/' + fileName);

      //if the directory does not exist, create it
      return fileService.checkDir(fileSystem, baseDir)
        .catch(fileService.createDir(fileSystem, baseDir, false))
        .then(fileService.checkDir(fileSystem, relativePath))
        .catch(fileService.createDir(fileSystem, relativePath, false))
        //if the file does not exist, create it
        .then(fileService.createFile(fileSystem, relativePath + '/' + fileName, false));
    }

    function getQuiz() {
      return _quiz;
    }
  }

}());
