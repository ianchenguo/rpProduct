/**
 * Created by guochen on 25/02/15.
 */
angular
  .module('app.quiz.questions')
  .directive('ceDraggable', ceDraggable);

ceDraggable.$inject = ['$document', '$ionicGesture', 'logService'];

function ceDraggable($document, $ionicGesture, logService) {

  //define utility functions
  var utility = {
    setCss: setCss,
    getUnderneathEl: getUnderneathEl
  };

  //define directive object
  var directive = {
    restrict: 'A',
    link: link
  };

  return directive;
  //////

  //implement link function
  function link(scope, element, attrs) {

    var touchX, touchY, dx, dy,dt,isDummy;

    var dragStart = $ionicGesture.on
    ('dragstart dummydragstart', onTouchStart, element);

    var dragMove = $ionicGesture.on
    ('drag dummydrag', onTouchMove, element);

    var dragEnd = $ionicGesture.on
    ('dragend dummydragend', onTouchEnd, element);


    //////
    function onTouchStart(event) {
      //event.gesture.srcEvent.preventDefault();
      event.preventDefault();
      event.stopPropagation();

      //refactor this later
      isDummy = event.type === 'dummydragstart';



      console.log(event);
      console.log(element);

      touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
      touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;

      utility.setCss(element, {
        transform: 'scale(1.1)',
        opacity: 0.8,
        zIndex: 99,
        position: 'absolute'
      });

      //refactor this later
      if(!isDummy) {
        logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy, dt);
      }
    }

    function onTouchMove(event) {

      event.preventDefault();
      //event.gesture.srcEvent.preventDefault();
      event.stopPropagation();

      //refactor this later
      isDummy = event.type === 'dummydrag';

      console.log(event);
      console.log(element);

      touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
      touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;
      dx = event.gesture ? event.gesture.deltaX : event.detail.deltaX;
      dy = event.gesture ? event.gesture.deltaY : event.detail.deltaY;
      dt = event.gesture ? event.gesture.deltaTime : 0;

      utility.setCss(element,
        {transform: 'translate3D(' + dx + 'px, ' + dy + 'px, 0px) scale(1.1)'});

      //refactor this later
      if(!isDummy) {
        logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy, dt);
      }
      return false;
    }

    function onTouchEnd(event) {
      event.preventDefault();
      //event.gesture.srcEvent.preventDefault();
      event.stopPropagation();

      //refactor this later
      isDummy = event.type === 'dummydragend';

      console.log(event);
      console.log(element);

      touchX = event.gesture ? event.gesture.center.pageX : event.detail.pageX;
      touchY = event.gesture ? event.gesture.center.pageY : event.detail.pageY;
      dx = event.gesture ? event.gesture.deltaX : event.detail.deltaX;
      dy = event.gesture ? event.gesture.deltaY : event.detail.deltaY;
      dt = event.gesture ? event.gesture.deltaTime : 0;



      console.log('<<underneath: ');
      var underneathEl = utility.getUnderneathEl(element[0], touchX, touchY);
      console.log('underneath>>');

      //test if the underneath element is droppable
      if (underneathEl.attr('droppable')) {
        //test if the underneath element already contains current element
        if (underneathEl.children(0) !== element[0]) {
          underneathEl.append(element[0]);
        }
      }

      utility.setCss(element, {transform: '', opacity: '', zIndex: '', position: ''});

      //refactor this later
      if(!isDummy) {
        logService.logTouch(event.timeStamp, event.type, element.attr('id'), touchX, touchY, dx, dy, dt);
      }

      touchX = touchY = dx = dy = dt = isDummy = '';
    }
  }

  //implement utility functions

  function setCss(element, styles) {
    element.css({
      transform: styles.transform,
      webkitTransform: styles.transform,
      opacity: styles.opacity,
      zIndex: styles.zIndex,
      position: styles.position
    });
  }

  function getUnderneathEl(currentEl, touchX, touchY) {
    console.log(currentEl);

    currentEl.style.display = 'none';
    var wrapperEl = $document[0].elementFromPoint(touchX, touchY);
    console.log(wrapperEl);
    currentEl.style.display = '';

    //return wrapped element
    return angular.element(wrapperEl);
  }
}
