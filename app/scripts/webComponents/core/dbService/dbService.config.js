/**
 * Created by guochen on 17/03/15.
 */

(function () {
  'use strict';
  angular
    .module('core.dbService')
    .config(config);


  config.$inject = ['pouchDBProvider', 'POUCHDB_METHODS'];

  function config(pouchDBProvider, POUCHDB_METHODS) {

    var relationalPouch = {
      setSchema: 'qify',
      rel: {
        save: 'qify',
        find: 'qify',
        del: 'qify',
        putAttachment: 'qify',
        getAttachment: 'qify',
        removeAttachment: 'qify',
        parseDocID: 'qify',
        makeDocID: 'qify'
      }
    };
    pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, relationalPouch);
  }

}());
