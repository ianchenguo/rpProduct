/**
 * Created by guochen on 16/04/15.
 */

(function () {
  'use strict';
  angular
    .module('app.questionCommon')
    .factory('movePieceService', movePieceService);

  function movePieceService() {
    var service = {
      movePiece:movePiece
    };

    return service;

    //////
    function movePiece(fromId, toId){
      $(document).ready(function(){
        var sourceEl;
        var destinationEl;
        var sourceChildCard;
        var destinationChildCard;

        //gets wrapped source element and destination element
        sourceEl = $('#'+ fromId);
        destinationEl = $('#' + toId);
        //gets wrapped sourceCard and destination card, if presented
        sourceChildCard = getChildCard(sourceEl);
        destinationChildCard = getChildCard(destinationEl);

        //moves the piece if the source base is not empty and the target base is empty
        if (sourceChildCard[0] && !destinationChildCard[0]) {

          console.log('start moving');
          console.log(destinationEl.find('div'));
          destinationEl.find('div').append(sourceChildCard[0]);
          console.log(destinationEl);
          return true;
        }

        else {
          return false;
        }

      });
    }

    function getChildCard(el) {
      return el.find('.ce-card');
    }

  }
}());

