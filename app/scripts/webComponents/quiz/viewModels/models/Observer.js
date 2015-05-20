/**
 * Created by guochen on 14/03/15.
 */

(function () {
  'use strict';
  angular
    .module('app.quiz.viewModel')
    .factory('Observer', Observer);

  function Observer() {

    var Observer = function Observer(init) {

      //this.firstName = init.firstName;
      //this.lastName = init.lastName;
      this.fullNameOrCode = init.fullNameOrCode;
      this.email = init.email;
    };

    return Observer;
  }

}());
