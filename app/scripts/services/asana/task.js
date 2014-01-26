'use strict'; 

angular.module('Asana')
  .service('Task', ['$resource', 'ASANA_API_URL', function Task($resource, ASANA_API_URL) {
    return $resource(ASANA_API_URL + '/tasks', {}, {
      get: {method: 'GET'}
    });
  }]);
