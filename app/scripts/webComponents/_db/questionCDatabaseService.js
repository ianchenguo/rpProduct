// questionCDatabaseService.js
(function () {
	'use strict';

	var serviceM = angular.module('app.questionCDatabaseServiceJson');

	serviceM.service('qcCommandInforRequest', ['$http', '$log', function($http, $log){
		this.obtainDossierService = function (func) {
			// ./scripts/webComponents/_db/questionCCommandsFromAndTo.json
			// ./questionCCommandsFromAndTo.json
			$http.get('./scripts/webComponents/_db/questionCCommandsFromAndTo.json')
			.success(function (data) {
				func(data);
				$log.log('service obtain data');
			})
			.error(function(data, config, status) {
				$log.log(data+config+status);
			});
		}
	}]);

})();