/**
 * Created by guochen on 6/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.log')
    .factory('logService', logService);

  function logService() {

    //basic log object
    function TouchLog(timeStamp, evType, elId, x, y, dx, dy, dt) {
      this.timeStamp = timeStamp;
      this.evType = evType;
      this.elId = elId;
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.dt = dt;
    }

    //log array
    //var logs = [];


    //function TouchLog(timeStamp, evType, x, y) {
    //  this.timeStamp = timeStamp;
    //  this.evType = evType;
    //  this.x = x;
    //  this.y = y;
    //}

    var touchSession = [], touchSessions = [];


    var service = {
      logTouch: logTouch,
      //this use is not good, need to be refactored
      touchSessions: touchSessions
    }
    return service;

    //////
    function logTouch(timeStamp, evType, elId, x, y, dx, dy, dt) {

      if (evType === 'dragstart') {
        initTouchSession();
      }

      touchSession.push(new TouchLog(timeStamp, evType, elId, x, y, dx, dy, dt));
      //console.log(touchSession);

      if (evType === 'dragend') {
        touchSessions.push(touchSession);
        console.log(touchSessions);
      }
    }

    function initTouchSession() {
      touchSession = [];
    }

  }
}());
