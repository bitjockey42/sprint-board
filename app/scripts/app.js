'use strict';

angular.module('kanbanBoardApp', [
  'Asana',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$httpProvider', 'API_KEY', function ($httpProvider, API_KEY) {
    // For now, we are only going to read the Asana API key
    // This authenticates with the Asana API.
    $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + API_KEY;
  }]);
