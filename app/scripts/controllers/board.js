'use strict';

angular.module('kanbanBoardApp')
  .controller('BoardCtrl', ['$scope', 'Task', 'Project', 'Workspace', 'Tag', 'WORKSPACE_ID', 'PROJECT_ID', function ($scope, Task, Project, Workspace, Tag, WORKSPACE_ID, PROJECT_ID) {
    $scope.tags = [];
    var tagsLoaded = false;

    $scope.tagsLoaded = function () {
      return tagsLoaded;
    };

    $scope.loadTags = function () {
      Workspace.get({path: 'tags'}, function (response) {
        $scope.tags = response.data;
        tagsLoaded = true;
      });
    };
  }]);
