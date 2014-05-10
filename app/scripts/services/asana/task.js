'use strict'; 

angular.module('Asana')
  .service('Task', ['$resource', 'ASANA_API_URL', function Task($resource, ASANA_API_URL) {
    return $resource(ASANA_API_URL + '/tasks/:taskId/:path', {taskId: "@id", path: "@path"}, {
      get: {method: 'GET'},
      tags: {method: 'GET', params: {path: "tags"}},
      addTag: {method: 'POST', params: {path: "addTag"}},
      removeTag: {method: 'POST', params: {path: "removeTag"}}
    });
  }]);
