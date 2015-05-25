/**
 * Created by guochen on 27/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('cardBaseService', cardBaseService);

  cardBaseService.$inject = [
    '$cordovaNativeAudio',
    '$ionicPlatform',
    '$mdDialog',
    'readableLogService',
    'questionLevelService'];
  function cardBaseService($cordovaNativeAudio,
                           $ionicPlatform,
                           $mdDialog,
                           readableLogService,
                           questionLevelService) {

    var _desiredPattern = {};
    var _currentPattern = {};

    var _cardBases = [
      [
        {title: '1', droppable: true, droppableId: 'droppable1', id: 'ce-test-base-1'},
        {title: '2', droppable: true, droppableId: 'droppable2', id: 'ce-test-base-2'},
        {title: '3', droppable: true, droppableId: 'droppable3', id: 'ce-test-base-3'}
      ],
      [
        {title: 'X', droppable: true, droppableId: 'droppableX', id: 'ce-test-base-x'}
      ]];

    var service = {
      getCardBases: getCardBases,
      getDesiredPattern: getDesiredPattern,
      setDesiredPattern: setDesiredPattern,
      getCurrentPattern: getCurrentPattern,
      setInitPattern:setInitPattern,
      updateCurrentPatternPosition:updateCurrentPatternPosition,
      testPatterns: testPatterns,
      logPatternMatch:logPatternMatch,
      makeSound:makeSound
    };

    return service;


    //////
    function getCardBases() {
      return R.clone(_cardBases);
    }

    function getDesiredPattern() {
      return _desiredPattern;
    }

    function setDesiredPattern(cards) {
      _desiredPattern = setPattern(cards);
    }

    function getCurrentPattern() {
      return _currentPattern;
    }

    function setInitPattern(cards) {
      _currentPattern = setPattern(cards);
    }

    function setPattern(cards) {
      var formPattern = R.converge(
        R.zipObj,
        R.compose(R.pluck('id'), R.flatten, R.prop('bases')),
        R.compose(R.pluck('id'), R.prop('cards'))
      );
      return formPattern({bases: _cardBases, cards: cards});
    }

    function testPatterns() {
      return R.eqDeep(_currentPattern,_desiredPattern);
    }

    function updateCurrentPatternPosition(base,card) {
      _currentPattern[base] = card;
      return base;
    }

    function logPatternMatch() {
      var logData = R.clone(questionLevelService.getLocalQuestionLevel());
      logData.timeStamp = new Date().toJSON();

      readableLogService.saveLog(
        readableLogService.createLevelLog(logData)
      );
    }

    function makeSound() {
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
      //    .then(function (msg) {
      //      //console.log('msg: ');
      //      //console.log(msg);
      //      return $cordovaNativeAudio.unload('click');
      //    })
      //    .catch(function (error) {
      //      //console.log('error: ' + JSON.stringify(error));
      //    });
      //});

      //$mdDialog.show(
      //  $mdDialog.alert()
      //    .parent(angular.element(document.body))
      //    .title('You Make it!')
      //    .content('The desired pattern is matched!')
      //    .ariaLabel('Pattern Match Alert')
      //    .ok('Keep On!')
      //);

      var alert = $mdDialog.alert({
        title: 'You Made it!',
        content: 'The desired pattern is matched!',
        ok: 'Keep On!'
      });

      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }
  }
}());
