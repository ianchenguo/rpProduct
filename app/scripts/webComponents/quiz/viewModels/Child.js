/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Child', Child);

  function Child() {

    var Child = function Child(init) {

      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.age = init.age;
      this.gender = init.gender;
    };

    return Child;
  }

}());
