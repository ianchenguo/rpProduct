/**
 * Created by guochen on 15/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('quizService', quizService);

  quizService.$inject = ['$cordovaDevice','Quiz','Observer','Child','Device','quizDbService','STATE'];

  function quizService($cordovaDevice,Quiz,Observer,Child,Device,quizDbService,STATE) {

    var _quiz = new Quiz();

    var service = {
      getLocalQuiz: getLocalQuiz,
      initQuiz:initQuiz,
      getQuiz:getQuiz
    };
    return service;
    //////

    function getLocalQuiz() {
      return _quiz;
    }

    function initQuiz(childData,observerData) {

      var observer, child, device;

      observer = new Observer(observerData);
      child = new Child(childData);

      var test = $cordovaDevice.getUUID();

      //device = new Device(
      //  {
      //    platform: $cordovaDevice.getPlatform(),
      //    uuid: $cordovaDevice.getUUID(),
      //    version: $cordovaDevice.getVersion()
      //  });

      device = new Device(
        {
          platform: 'dummy',
          uuid: 'dummy',
          version: 'dummy'
        });

      _quiz = new Quiz({
        endTimeStamp:'',
        state: STATE.created,
        questions:[],
        observer: observer,
        child: child,
        device: device
      });

      return quizDbService.createQuiz(_quiz);
    }

    function getQuiz(id) {
      return quizDbService.getQuiz(id).then(handleSuccess).catch(handleError);
      ///
      function handleSuccess(value) {
        _quiz = angular.fromJson(value);
        return value;
      }
      function handleError(error) {
        return error;
      }
    }

  };

}());
