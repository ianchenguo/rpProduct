/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz')
    .factory('Observer', Observer);

  function Observer() {

    var Observer = function Observer(init) {
      this._id = 'observer_' + init.email.toLowerCase() + '_' + init.firstName.toLowerCase()  + '_' + init.lastName.toLowerCase();
      this._rev = '';
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
    };

    return Observer;
  }

}());
