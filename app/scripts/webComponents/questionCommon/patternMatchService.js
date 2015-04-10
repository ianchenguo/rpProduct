/**
 * Created by guochen on 27/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('patternMatchService', patternMatchService);

  patternMatchService.$inject = ['$cordovaNativeAudio', '$ionicPlatform'];
  function patternMatchService($cordovaNativeAudio, $ionicPlatform) {

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


      console.log(desiredPattern);


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

      console.log(currentPattern);
      console.log(desiredPattern);

      for (var i = 0; i < desiredPattern.length - 1; i++) {
        console.log('desiredCards: ' + desiredPattern[i]);
        console.log('currentPattern: ' + currentPattern[i]);
        if (!currentPattern[i] || currentPattern[i] !== desiredPattern[i]) {
          return;
        }
      }

      //$ionicPlatform.ready(function () {
      //  //console.log('hardware ready');
      //  //buggy!!!!
      //  $cordovaNativeAudio.unload('click');
      //  $cordovaNativeAudio
      //    .preloadSimple('click', 'media/audio.mp3')
      //    .then(function (msg) {
      //      //console.log('msg: ');
      //      //console.log(msg);
      //      return $cordovaNativeAudio.play('click');
      //    })
      //    .then(function(msg) {
      //      //console.log('msg: ');
      //      //console.log(msg);
      //      return $cordovaNativeAudio.unload('click');
      //    })
      //    .catch(function(error){
      //      //console.log('error: ' + JSON.stringify(error));
      //    });
      //});
      return true;
    }

    function initMatch(args,index) {

      if (args) {
        currentPattern = args;
      } else {
        currentPattern = [];
      }
      //console.log('match init');
    }

    function setDesiredPattern(cards) {
      var desiredCards = angular.copy(cards);

      function extractCardId(value) {
        return value.id;
      }

      desiredPattern = desiredCards.map(extractCardId);
      desiredPattern.push('');
    }

  }
}());
