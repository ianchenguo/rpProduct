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
      this._id = 'child_' + init.gender + '_' + init.age + '_' + init.firstName.toLowerCase()  + '_' + init.lastName.toLowerCase();
      this._rev = '';
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.age = init.age;
      this.gender = init.gender;
    };

    return Child;
  }

}());
