/**
 * Created by guochen on 11/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizService', quizService);

  quizService.$inject = ['$q', '$ionicPlatform', '$cordovaDevice', 'fileService'];

  function quizService($q, $ionicPlatform, $cordovaDevice, fileService) {

    var _quiz;

    var service = {
      getQuiz: getQuiz,
      createQuiz: createQuiz,
      persistQuizInfo: persistQuizInfo
    };
    return service;
    //////


    function getQuiz() {
      _checkQuiz();
      return _quiz;
    }

    function _checkQuiz() {
      if (!_quiz) {
        _createQuiz();
      }
    }

    function _createQuiz() {
      _quiz = new Quiz({id: '', envInfo: {}, quizInfo: {}, startTimeStamp: '', endTimeStamp: '', questions: []});
    }

    function Quiz(init) {
      this.id = init.id;
      this.startTimeStamp = init.startTimeStamp;
      this.endTimeStamp = init.endTimeStamp;
      this.envInfo = new EnvInfo(init.envInfo);
      this.quizInfo = new QuizInfo(init.quizInfo);
      this.questions = init.questions;
    }

    function QuizInfo(init) {
      this.observer = new Observer(init.observer);
      this.child = new Child(init.child);
    }

    function Observer(init) {
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
    }

    function Child(init) {
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.age = init.age;
      this.gender = init.gender;
    }

    function EnvInfo(init) {
      this.uuid = init.uuid;
      this.platform = init.platform;
    }


    //initialise a quiz
    function createQuiz(init) {

      var deferred = $q.defer();
      //create a quiz object
      _quiz = new _Quiz(init);
      //persist the quiz object
      $ionicPlatform.ready(function () {
        _populateDeviceInfo();
        persistQuizInfo().then(
          function (value) {
            q.reslove({state: 'success', detail: value})
          },
          function (error) {
            q.reject({state: 'error', detail: error})
          });
      });

      return deferred.promise;
    }

    function _populateDeviceInfo() {
      _quiz.envInfo.uuid = $cordovaDevice.getUUID();
      _quiz.envInfo.platform = $cordovaDevice.getPlatform();
    }


    function persistQuizInfo() {

      var
        baseDir = 'quizzes',
        subDir = _quiz.id,
        relativePath = baseDir + '/' + subDir,
        fileName = 'quiz.txt';

      console.log(relativePath + '/' + fileName);

      //if the directory does not exist, create it
      fileService.setFileSystem('');
      return fileService.checkDir('', baseDir)
        .catch(fileService.createDir('', baseDir, false))
        .then(fileService.checkDir('', relativePath))
        .catch(fileService.createDir('', relativePath, false))
        //if the file does not exist, create it
        .then(fileService.createFile('', relativePath + '/' + fileName, false));
    }

  }

}());
