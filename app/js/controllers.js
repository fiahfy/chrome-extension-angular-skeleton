'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('PopupMainCtrl', ['$scope', function($scope){
	$scope.message = 'This is my popup!';
	// save message
	chrome.storage.local.set({'message': $scope.message});
}]);
