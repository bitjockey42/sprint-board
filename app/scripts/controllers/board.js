'use strict';

angular.module('kanbanBoardApp')
  .controller('BoardCtrl', ['$scope', 'Task', 'Project', 'Workspace', 'Tag', 'WORKSPACE_ID', 'PROJECT_ID', function ($scope, Task, Project, Workspace, Tag, WORKSPACE_ID, PROJECT_ID) {
    $scope.pointsTotal = {};
    $scope.tasks = [];
    $scope.tags = [];
    var tasksLoaded = false;
    var tagsLoaded = false;

    $scope.$on('currentSprintProjectSet', function () {
      $scope.init();
    });

    $scope.tasksLoaded = function () {
      return tasksLoaded;
    }

    $scope.init = function () {
      $scope.loadProjectTasks();
      $scope.loadTags();
    };

    $scope.loadProjectTasks = function () {
      Project.tasks({projectId: $scope.currentSprintProject.id}, function (response) {
        $scope.tasks = response.data;
        tasksLoaded = true;
      });
    };

    $scope.tagsLoaded = function () {
      return tagsLoaded;
    };

    $scope.loadTags = function () {
      Workspace.get({path: 'tags'}, function (response) {
        $scope.tags = response.data;
        tagsLoaded = true;
      });
    };

    $scope.calculateTotal = function() {
      var pointValues = _.values($scope.pointsTotal);
      return pointValues.reduce( function(a,b) {
        return a + b;
      });
    };

    $scope.isProjectHeader = function (task) {
      if (task.name.match(/:$/)) {
        return true;
      } else {
        return false;
      }
    };

  }]);
