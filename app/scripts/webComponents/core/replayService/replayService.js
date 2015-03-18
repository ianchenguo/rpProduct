/**
 * Created by guochen on 6/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.replay')
    .factory('replayService', replayService);

  replayService.$inject = ['$document', '$timeout', 'logService'];

  function replayService($document, $timeout, logService) {

    var initDt = null;

    var service = {
      createCursor: createCursor,
      playCursor: playCursor
    }
    return service;

    //////
    function createCursor() {

    }

    function playCursor() {
      var touchSessions = logService.touchSessions;
      //console.log(logService.touchSessions);
      for (var i = 0; i < touchSessions.length; i++) {
        var tSession = touchSessions[i];


        for (var j = 0; j < tSession.length; j++) {
          //console.log(tSession[j]);

          (function () {
            var s = tSession[j];
            //var t2 = s.timeStamp;
            //var t1 = lastT || s.timeStamp;
            //var dt = t2 - t1;
            //lastT = t2;
            //console.log(dt);


            $timeout(function () {

              //var gesture = new ionic.Gesture(element, options);
              //console.log(gesture);

              //var gesture = new ionic.Gesture(angular.element('#'+ s.elId)[0]);
              //console.log(gesture);
              //gesture.on(s.evType, function(){});
              //console.log(gesture);

              //var dummyGesture = {
              //  bubbles: true,
              //  cancelBubble: false,
              //  cancelable: true,
              //  currentTarget: null,
              //  defaultPrevented: true,
              //  eventPhase: 0,
              //  gesture: {
              //    deltaX: s.dx,
              //    deltaY: s.dy,
              //    center: {
              //      pageX: s.x,
              //      pageY: s.y
              //    }
              //  },
              //  srcElement:angular.element('#'+ s.elId)[0],
              //  target:angular.element('#'+ s.elId)[0],
              //  type: s.evType
              //}
              //console.log(dummyGesture);

              //var cancelled = !angular.element('#'+ s.elId)[0].dispatchEvent(dummyGesture);
              //console.log(cancelled);


              ////console.log(angular.element('#cursor'));
              angular.element('#cursor').offset({left:s.x,top: s.y});
              ////
              ////var e = new $.Event(s.evType);
              ////e.clientX = s.x;
              ////e.clientY = s.y;
              //
              ////console.log(e);
              //
              ////if(s.evType === 'mousedown') {
              //  var underEl = angular.element($document[0].elementFromPoint(s.x, s.y));
              ////}
              //
              ////console.log(underEl);
              ////underEl.trigger(s.evType);
              //
              //console.log('s.x: '+ s.x + ' s.y: ' + s.y);
              var dummyEvType = function () {
                if (s.evType === 'dragstart') {
                  return 'dummydragstart';
                } else if (s.evType === 'drag') {
                  return 'dummydrag';
                } else if (s.evType === 'dragend') {
                  return 'dummydragend';
                }
              }();


              var e = new CustomEvent(dummyEvType, {
                bubbles: true,
                cancelable: true,
                'detail': {
                  'pageX': s.x,
                  'pageY': s.y,
                  'deltaX': s.dx,
                  'deltaY': s.dy,
                  'srcElement': angular.element('#' + s.elId)[0],
                  'target': angular.element('#' + s.elId)[0]
                }
              })


              //var e = new MouseEvent(convertedMouseEv, {
              //
              //  'clientX': s.x,
              //  'clientY':s.y,
              //  'view': window,
              //  'bubbles': true,
              //  'cancelable': true,
              //  'srcElement':angular.element('#'+ s.elId)[0],
              //  'target':angular.element('#'+ s.elId)[0]
              //});

              //console.log('<mock event start');
              //console.log(e);
              //console.log('mock event end>');


              var cancelled = !angular.element('#' + s.elId)[0].dispatchEvent(e);
              //console.log(cancelled);
            }, s.dt);
          }());
        }
      }
    }
  }
}());
