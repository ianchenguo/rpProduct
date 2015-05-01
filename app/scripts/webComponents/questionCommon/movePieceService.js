/**
 * Created by guochen on 16/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('movePieceService', movePieceService);

  movePieceService.$inject = ['$rootScope'];

  function movePieceService($rootScope) {
    var service = {
      movePiece: movePiece
    };

    return service;

    //////
    function movePiece(fromId, toId) {
      var isSucceeded = false;
      $(document).ready(function () {

        var sourceEl;
        var destinationEl;
        var sourceChildCard;
        var destinationChildCard;

        //gets wrapped source element and destination element
        sourceEl = $('#' + fromId);
        destinationEl = $('#' + toId);
        //gets wrapped sourceCard and destination card, if presented
        sourceChildCard = _getChildCard(sourceEl);
        destinationChildCard = _getChildCard(destinationEl);
        //moves the piece if the source base is not empty and the target base is empty
        if (sourceChildCard[0] && !destinationChildCard[0]) {
          //destinationEl.find('div').append(sourceChildCard[0]);

          console.log(sourceChildCard);

          console.log(destinationEl.position().left);
          console.log(destinationEl.position().top);
          sourceChildCard.css({
            transform: 'scale(1.1)',
            webkitTransform: 'scale(1.1)',
            transition: 'all 5s',
            webkitTransition: 'all 5s',
            opacity: 0.8,
            zIndex: 99,
            position: 'absolute',
            left: destinationEl.position().left,
            top: destinationEl.position().top
          });
          //
          //console.log(sourceChildCard.css());


          sourceChildCard.appendTo(destinationEl);


          //sourceChildCard.css({
          //  transform: '',
          //  webkitTransform: '',
          //  transition: '',
          //  webkitTransition: '',
          //  opacity: '',
          //  zIndex: '',
          //  position: '',
          //  left: '',
          //  top: ''
          //});

          $rootScope.$broadcast('dropSuccess', {cardId: sourceChildCard.attr('id')});

          isSucceeded = true;
        } else {
          isSucceeded = false;
        }
      });
      return isSucceeded;
    }

    function _getChildCard(el) {
      return el.find('.ce-card');
    }

  }
}());

