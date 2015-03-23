///**
// * Created by guochen on 23/03/15.
// */
//
//(function () {
//  'use strict';
//  angular
//    .module('app.quiz')
//    .factory('Touch', Touch);
//
//  function Touch() {
//
//    var Touch = function Touch(init) {
//      this.timeStamp = init.timeStamp;
//      this.evType = init.evType;
//      this.elId = init.elId;
//      this.x = init.x;
//      this.y = init.y;
//      this.dx = init.dx;
//      this.dy = init.dy;
//      this.dt = init.dt;
//    }
//
//    return Touch;
//  }
//}());

/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Touch', Touch);

  function Touch() {

    var Touch = function Touch(init) {
      this.timeStamp = init.timeStamp;
      this.evType = init.evType;
      this.elId = init.elId;
      this.x = init.x;
      this.y = init.y;
      this.dx = init.dx;
      this.dy = init.dy;
      this.dt = init.dt;
    };

    return Touch;
  }

}());
