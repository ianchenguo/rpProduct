/**
 * Created by guochen on 27/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('patternMatchService', patternMatchService);

  patternMatchService.$inject = [
    '$cordovaNativeAudio',
    '$ionicPlatform',
    'readableLogService',
    'questionLevelService'];
  function patternMatchService($cordovaNativeAudio,
                               $ionicPlatform,
                               readableLogService,
                               questionLevelService) {

    var desiredPattern = [];
    var currentPattern = [];

    var service = {
      setDesiredPattern: setDesiredPattern,
      testPattern: testPattern,
      initMatch: initMatch
    };

    return service;


    //////
    function testPattern(targetId, cardId, sourceId) {

      var targetIndex = targetId.charAt(targetId.length - 1),
        sourceIndex;

      //console.log('targetId: ' + targetId);
      //console.log('cardId: ' + cardId);
      //console.log('sourceId: ' + sourceId);
      if (sourceId && sourceId.match(/^droppable\d$/)) {
        sourceIndex = sourceId.charAt(sourceId.length - 1);

        currentPattern[sourceIndex - 1] = '';
      }
      currentPattern[targetIndex - 1] = cardId;
      //console.log(currentPattern);
      //console.log(desiredPattern);

      for (var i = 0; i < desiredPattern.length - 1; i++) {
        //console.log('desiredCards: ' + desiredPattern[i]);
        //console.log('currentPattern: ' + currentPattern[i]);
        if (!currentPattern[i] || currentPattern[i] !== desiredPattern[i]) {
          return;
        }
      }
      _logLevelMatch();
      _ring();
      return true;
    }


    function initMatch(cards) {
      currentPattern = _createPattern(cards);
    }


    function setDesiredPattern(cards) {
      desiredPattern = _createPattern(cards);
    }


    function _createPattern(cards) {
      var tempCards = angular.copy(cards);
      var tempPattern = tempCards.map(_extractCardId);
      tempPattern.push(' ');
      return tempPattern;
    }


    function _extractCardId(value) {
      return value.id;
    }


    function _ring() {
      $ionicPlatform.ready(function () {
        //console.log('hardware ready');
        //buggy!!!!
        $cordovaNativeAudio.unload('click');
        $cordovaNativeAudio
          .preloadSimple('click', 'media/audio.mp3')
          .then(function (msg) {
            //console.log('msg: ');
            //console.log(msg);
            return $cordovaNativeAudio.play('click');
          })
          .then(function (msg) {
            //console.log('msg: ');
            //console.log(msg);
            return $cordovaNativeAudio.unload('click');
          })
          .catch(function (error) {
            //console.log('error: ' + JSON.stringify(error));
          });
      });
    }


    function _logLevelMatch() {
      var logData = R.clone(questionLevelService.getLocalQuestionLevel());
      logData.timeStamp = new Date().toJSON();

      readableLogService.saveLog(
        readableLogService.createLevelLog(logData)
      );
    }


  }
}());
