'use strict';

angular.module('kanbanBoardApp')
  .controller('BoardCtrl', ['$scope', 'Task', 'Project', 'Workspace', 'Tag', 'WORKSPACE_ID', 'PROJECT_ID', function ($scope, Task, Project, Workspace, Tag, WORKSPACE_ID, PROJECT_ID) {
    $scope.pointTotal = [];
    $scope.tasks = [];
    var tasksLoaded = false;

    $scope.tasksLoaded = function () {
      return tasksLoaded;
    }

    $scope.loadProjectTasks = function () {
      Project.tasks({projectId: PROJECT_ID}, function (response) {
        $scope.tasks = response.data;
        tasksLoaded = true;
      });
    };

  }]);
