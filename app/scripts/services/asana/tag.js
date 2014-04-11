'use strict';

angular.module('Asana')
  .service('Tag', ['$resource', 'ASANA_API_URL', function Tag($resource, ASANA_API_URL) {
    return $resource(ASANA_API_URL + '/tags/:tagId/:path', {tagId: "@id", path: "@path"}, {
      get: {method: 'GET'},
      tasks: {method: 'GET', params: {path: "tasks"}}
    });
  }]);