/**
 * Created by guochen on 27/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('patternMatchService', patternMatchService);

  patternMatchService.$inject = ['$q', '$cordovaNativeAudio', '$ionicPlatform'];
  function patternMatchService($q, $cordovaNativeAudio, $ionicPlatform) {

    var desiredPattern = [['question-a-img-a1', 'question-a-img-a2', 'question-a-img-a3', ''],
      ['question-a-img-b1', 'question-a-img-b2', 'question-a-img-b3', '']],
      currentPattern = [],
      desiredPatternIdx;

    var service = {
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
        //console.log('sourceIndex ' + sourceIndex);

        //if(currentPattern[sourceIndex]) {
        currentPattern[sourceIndex - 1] = '';
        //}

      }

      //console.log('target index: ' + targetIndex);
      currentPattern[targetIndex - 1] = cardId;

      //console.log('current pattern: ');
      //console.log(currentPattern);
      //
      //console.log('desired pattern: ');
      //console.log(desiredPattern[desiredPatternIdx]);

      for (var i = 0; i < desiredPattern[0].length - 1; i++) {


        //console.log('desiredPattern: ' + desiredPattern[0][i]);
        //console.log('currentPattern: ' + currentPattern[i]);
        if (!currentPattern[i] || currentPattern[i] !== desiredPattern[desiredPatternIdx][i]) {
          return;
        }
      }
      //console.log('trurururururururururururururur');


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
          .then(function(msg) {
            //console.log('msg: ');
            //console.log(msg);
            return $cordovaNativeAudio.unload('click');
          })
          .catch(function(error){
            //console.log('error: ' + JSON.stringify(error));
          });
      });


      return true;
    }

    function initMatch(args,index) {
      //console.log(index);
      desiredPatternIdx = index;
      if (args) {
        currentPattern = args;
      } else {
        currentPattern = [];
      }
      //console.log('match init');
    }

  }


}());
