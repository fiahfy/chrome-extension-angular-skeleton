'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {

	beforeEach(function(){
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});

		var dummyStorage;
		chrome = {
			storage: {
				local: {
					get: function(){},
					set: function(){}
				}
			}
		};
		spyOn(chrome.storage.local, 'get').andCallFake(function(key, callback){
			return dummyStorage[key];
		});
		spyOn(chrome.storage.local, 'set').andCallFake(function(data, callback){
			dummyStorage = data;
		});
	});

	beforeEach(module('app'));

	describe('PopupMainCtrl', function(){
		var scope, ctrl;

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('PopupMainCtrl', {$scope: scope});
		}));

		it('valid message', function() {
			expect(scope.message).toEqual('This is my popup!');
		});

		it('valid saved message', function() {
			expect(chrome.storage.local.get('message')).toEqual('This is my popup!');
		});
	});
});
