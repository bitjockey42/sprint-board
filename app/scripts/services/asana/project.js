'use strict';

angular.module('Asana')
  .service('Project', ['$resource', 'ASANA_API_URL', function Project($resource, ASANA_API_URL) {
    return $resource(ASANA_API_URL + '/projects/:projectId/:path', {projectId: "@id", path: "@path"},  {
      get: {method: 'GET'},
      tasks: {method: 'GET', params: {path: "tasks"}}
    });
  }]);
