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

        console.log('i am in move piece');
        console.log(fromId);
        console.log(toId);

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
            transform: 'translate3D(' + dx + 'px, ' + dy + 'px, 0px) scale(1.1)',
            '-webkit-transform': 'translate3D(' + dx + 'px, ' + dy + 'px, 0px) scale(1.1)',
            transition: 'all 0.5s ease',
            '-webkit-transition': 'all 0.1s'
          });

          $timeout(
            function () {
              sourceChildCard.css({
                display: '',
                transform: '',
                '-webkit-transform': '',
                transition: '',
                '-webkit-transition': ''
              });
              destinationEl.find('div').append(sourceChildCard[0]);
              $rootScope.$broadcast('dropSuccess', {cardId: sourceChildCard.attr('id')});
              deferred.resolve({idx: idx, isSuccess: true, from:fromId, to:toId});

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

