/**
 * Created by guochen on 25/02/15.
 */

(function () {
  angular
    .module('app.questionCommon')
    .directive('ceDraggable', ceDraggable);

  ceDraggable.$inject = [
    '$document',
    '$rootScope',
    '$ionicGesture',
    'logService',
    'Touch',
    'cardBaseService',
    'readableLogService'];

  function ceDraggable($document,
                       $rootScope,
                       $ionicGesture,
                       logService,
                       Touch,
                       cardBaseService,
                       readableLogService) {

    var _utils = {
      setCss: _setCss,
      getUnderneathEl: _getUnderneathEl,
      logTouch: _logTouch,
      createDragStartLog: _createDragStartLog,
      createDragEndLog: _createDragEndLog,
      preventEvent: _preventEvent,
      matchPattern: _matchPattern
    };

    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;
    //////


    //implement link function
    function link(scope, element, attrs) {

      var touchX;
      var touchY;
      var dx;
      var dy;
      var dt;
      var isDummy;

      var dragStart = $ionicGesture.on
      ('dragstart dummydragstart', onTouchStart, element);

      var dragMove = $ionicGesture.on
      ('drag dummydrag', onTouchMove, element);

      var dragEnd = $ionicGesture.on
      ('dragend dummydragend', onTouchEnd, element);


      //////
      function onTouchStart(event) {

        var storedElPositionX;
        var storedElPositionY;
        var underneathEl;

        _utils.preventEvent(event);
        //refactor this later
        isDummy = event.type === 'dummydragstart';
        touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
        touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;

        storedElPositionX = element.position().left;
        storedElPositionY = element.position().top;

        _utils.setCss(element, {
          transform: 'scale(1.1)',
          opacity: 0.8,
          zIndex: 99,
          position: 'absolute',
          left: storedElPositionX,
          top: storedElPositionY
        });

        _utils.logTouch(isDummy, event, element, touchX, touchY, dx, dy, dt, true);

        underneathEl = _utils.getUnderneathEl(element[0], touchX, touchY);

        _utils.createDragStartLog(
          underneathEl.attr('id'),
          element.attr('id'),
          event.type,
          new Date(event.timeStamp).toJSON());
      }


      function onTouchMove(event) {

        _utils.preventEvent(event);
        //refactor this later
        isDummy = event.type === 'dummydrag';

        //console.log(event);
        //console.log(element);

        touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
        touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;
        dx = event.gesture ? event.gesture.deltaX : event.detail.deltaX;
        dy = event.gesture ? event.gesture.deltaY : event.detail.deltaY;
        dt = event.gesture ? event.gesture.deltaTime : 0;

        _utils.setCss(element,
          {transform: 'translate3D(' + dx + 'px, ' + dy + 'px, 0px) scale(1.1)'});

        //refactor this later
        _utils.logTouch(isDummy, event, element, touchX, touchY, dx, dy, dt, true);

        //why return false?
        return false;
      }


      function onTouchEnd(event) {

        var isSucceeded = false;
        var underneathEl;

        _utils.preventEvent(event);

        //refactor this later
        isDummy = event.type === 'dummydragend';

        touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
        touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;
        dx = event.gesture ? event.gesture.deltaX : event.detail.deltaX;
        dy = event.gesture ? event.gesture.deltaY : event.detail.deltaY;
        dt = event.gesture ? event.gesture.deltaTime : 0;

        underneathEl = _utils.getUnderneathEl(element[0], touchX, touchY);

        //test if the underneath element is droppable
        if (underneathEl.attr('droppable')) {

          if (!underneathEl.find('.ce-card')[0]) {
            //console.log(underneathEl);
            //console.log(element);
            //console.log(element.parent());
            var targetId = underneathEl[0].id;
            var cardId = element[0].id;
            var sourceId = element.parent()[0].id;

            underneathEl.append(element[0]);
            isSucceeded = true;

            $rootScope.$broadcast('dropSuccess',{cardId:element.attr('id')});
            //_utils.matchPattern(underneathEl, targetId, cardId, sourceId);
          }
        }

        _utils.createDragEndLog(
          underneathEl.attr('id'),
          element.attr('id'),
          event.type,
          new Date(event.timeStamp).toJSON(),
          isSucceeded);

        _utils.setCss(element, {transform: '', opacity: '', zIndex: '', position: '', left: '', top: ''});

        //refactor this later
        _utils.logTouch(isDummy, event, element, touchX, touchY, dx, dy, dt, isSucceeded);


        touchX = touchY = dx = dy = dt = isDummy = '';
      }
    }


    //implement _utils functions
    function _setCss(element, styles) {
      element.css({
        transform: styles.transform,
        webkitTransform: styles.transform,
        opacity: styles.opacity,
        zIndex: styles.zIndex,
        position: styles.position,
        left: styles.left,
        top: styles.top
      });
    }

    function _getUnderneathEl(currentEl, touchX, touchY) {
      //console.log(currentEl);
      currentEl.style.display = 'none';
      var wrapperEl = $document[0].elementFromPoint(touchX, touchY);
      //console.log(wrapperEl);
      currentEl.style.display = '';

      //return wrapped element
      return angular.element(wrapperEl);
    }

    function _logTouch(isDummy, event, element, touchX, touchY, dx, dy, dt, isSucceeded) {
      if (!isDummy) {
        var touch = new Touch({
          timeStamp: event.timeStamp,
          evType: event.type,
          elId: element.attr('id'),
          x: touchX,
          y: touchY,
          dx: dx,
          dy: dy,
          dt: dt,
          success: isSucceeded
        });
        logService.logTouch(touch);
      }
    }


    function _createDragStartLog(parent, elId, evType, timeStamp) {

      readableLogService.saveLog(
        readableLogService.createDragLog({
          fromParent: parent,
          elId: elId,
          evType: evType,
          timeStamp: timeStamp
        })
      );
    }


    function _createDragEndLog(parent, elId, evType, timeStamp, isSucceeded) {

      readableLogService.saveLog(
        readableLogService.createDragLog({
          toParent: parent,
          elId: elId,
          evType: evType,
          timeStamp: timeStamp,
          isSucceeded: isSucceeded
        })
      );
    }

    function _preventEvent(event) {
      if (event.gesture) {
        event.gesture.srcEvent.preventDefault();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    function _matchPattern(underneathEl, targetId, cardId, sourceId) {
      //console.log('should match: '+ underneathEl.attr('should-match'));
      if (underneathEl.attr('should-match') !== 'false') {
        cardBaseService.testPattern(targetId, cardId, sourceId);
      }
    }
  }

}());
