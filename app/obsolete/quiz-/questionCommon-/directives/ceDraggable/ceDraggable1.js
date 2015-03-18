/**
 * Created by guochen on 25/02/15.
 */
angular
  .module('app.quiz.questions')
  .directive('ceDraggable', ceDraggable);

ceDraggable.$inject = ['$document', '$ionicGesture', 'logService'];

function ceDraggable($document, $ionicGesture, logService) {

  var onDrag = false;

  //define utility functions
  var utility = {
    setCss: setCss,
    createLog: createLog,
    getUnderneathEl: getUnderneathEl
  }

  //define directive object
  var directive = {
    restrict: 'A',
    link: link
  }

  return directive;
  //////

  //implement link function
  function link(scope, element, attrs) {

    var elInitX, elInitY, touchInitX, touchInitY, dx, dy;

    var touchStart = $ionicGesture.on
    ('touchstart mousedown', onTouchStart, element);

    var touchMove = $ionicGesture.on
    ('touchmove mousemove', onTouchMove, $document);

    var touchEnd = $ionicGesture.on
    ('touchend mouseup', onTouchEnd, $document);


    //////
    function onTouchStart(event) {
      event.preventDefault();
      event.stopPropagation();

      //console.log(event);
      //console.log(element);

      onDrag = true;

      elInitX = element[0].offsetLeft;
      elInitY = element[0].offsetTop;
      touchInitX = event.touches ? event.touches[0].clientX : event.clientX;
      touchInitY = event.touches ? event.touches[0].clientY : event.clientY;

      utility.setCss(element, {
        transform: 'scale(1.1)',
        opacity: 0.8,
        zIndex: 99,
        position: 'absolute'
      });
      //utility.createLog(event.timeStamp, element.attr('id'), event.type, elInitX, elInitY, dx, dy);
      //logService.logTouch(event.timeStamp,event.type,touchInitX,touchInitY);
      logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy);

      return false;
    }

    function onTouchMove(event) {
      //if(onDrag) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();

        console.log(event);
        console.log(element);

        var touchCurrentX = event.touches ? event.touches[0].clientX : event.clientX,
          touchCurrentY = event.touches ? event.touches[0].clientY : event.clientY;
        dx = touchCurrentX - touchInitX;
        dy = touchCurrentY - touchInitY;

        utility.setCss(element,
          {transform: 'translate3D(' + dx + 'px, ' + dy + 'px, 0px) scale(1.1)'});
        //utility.createLog(event.timeStamp, element.attr('id'), event.type, elInitX, elInitY, dx, dy);
        //logService.logTouch(event.timeStamp,event.type,touchCurrentX,touchCurrentY);
      logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy);

      //}

      return false;
    }

    function onTouchEnd(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();

      console.log(event);
      console.log(element);

      var touchEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX,
        touchEndY = event.changedTouches ? event.changedTouches[0].clientY : event.clientY;

      var underneathEl = utility.getUnderneathEl(element[0], touchEndX, touchEndY);
      //test if the underneath element is droppable
      if (underneathEl.attr('droppable')) {
        //test if the underneath element already contains current element
        if (underneathEl.children(0) !== element[0]) {
          underneathEl.append(element[0]);
        }
      }

      utility.setCss(element, {transform: '', opacity: '', zIndex: '', position: ''});
      //utility.createLog(event.timeStamp, element.attr('id'), event.type, elInitX, elInitY, dx, dy);
      //logService.logTouch(event.timeStamp,event.type,touchEndX,touchEndY);
      logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy);


      resetCoords();
      onDrag = false;

      return false;

    }

    function resetCoords() {
      elInitX = '';
      elInitY = '';
      touchInitX = '';
      touchInitY = '';
      dx = '';
      dy = '';
    }
  }

  //implement utility functions
  function createLog(timeStamp, elId, event, elInitX, elInitY, dx, dy) {
    logService.createLog(timeStamp, elId, event, elInitX, elInitY, dx, dy);
  }

  function setCss(element, styles) {
    element.css({
      transform: styles.transform,
      webkitTransform: styles.transform,
      opacity: styles.opacity,
      zIndex: styles.zIndex,
      position: styles.position
    });
  }

  function getUnderneathEl(currentEl, touchEndX, touchEndY) {
    currentEl.style.display = 'none';
    var wrapperEl = $document[0].elementFromPoint(touchEndX, touchEndY);
    currentEl.style.display = '';

    //return wrapped element
    return angular.element(wrapperEl);
  }
}
