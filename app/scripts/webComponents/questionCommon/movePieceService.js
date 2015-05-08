/**
 * Created by guochen on 16/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('movePieceService', movePieceService);

  movePieceService.$inject = ['$timeout', '$rootScope', '$q'];

  function movePieceService($timeout, $rootScope, $q) {
    var service = {
      movePiece: movePiece
    };

    return service;

    //////
    function movePiece(fromId, toId, idx) {

      var deferred = $q.defer();
      var sourceEl;
      var destinationEl;
      var sourceChildCard;
      var destinationChildCard;

      $(document).ready(function () {

        //gets wrapped source element and destination element
        sourceEl = $('#' + fromId);
        destinationEl = $('#' + toId);
        //gets wrapped sourceCard and destination card, if presented
        sourceChildCard = _getChildCard(sourceEl);
        destinationChildCard = _getChildCard(destinationEl);
        //moves the piece if the source base is not empty and the target base is empty
        if (sourceChildCard[0] && !destinationChildCard[0]) {
          //destinationEl.find('div').append(sourceChildCard[0]);
          var storedElPositionX = sourceChildCard.offset().left;
          var storedElPositionY = sourceChildCard.offset().top;
          var destinationPositionX = destinationEl.offset().left;
          var destinationPositionY = destinationEl.offset().top;
          var dx = destinationPositionX - storedElPositionX;
          var dy = destinationPositionY - storedElPositionY;

          sourceChildCard.css({
            display: 'block',
            '-webkit-transform': 'translate(' + dx + 'px,' + dy + 'px)',
            '-webkit-transition': 'all 0.5s ease'
          });

          $timeout(
            function () {
              sourceChildCard.css({
                display: '',
                '-webkit-transform': '',
                '-webkit-transition': ''
              });
              destinationEl.find('div').append(sourceChildCard[0]);
              $rootScope.$broadcast('dropSuccess', {cardId: sourceChildCard.attr('id')});
              deferred.resolve({idx: idx, isSuccess: true});

            }, 501);

        } else {
          deferred.reject({idx: idx, isSuccess: false});
        }
      });

      return deferred.promise;
    }

    function _getChildCard(el) {
      return el.find('.ce-card');
    }
  }
}());

