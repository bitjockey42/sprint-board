'use strict';

angular.module('kanbanBoardApp')
  .controller('BoardCtrl', ['$scope', 'Project', 'Workspace', 'Points', 'WORKSPACE_ID', function ($scope, Project, Workspace, Points, WORKSPACE_ID) {

    $scope.tasks = [];
    $scope.allPointTags = [];
    var tasksLoaded = false;
    var tagsLoaded = false;

    $scope.$watch('currentSprintProject', function (newValue, oldValue) {
      if (newValue == oldValue) {
        return;
      } else {
        $scope.pointsByTaskId = {};
        $scope.init();
      }
    });

    $scope.init = function () {
      $scope.loadProjectTasks();
      $scope.loadAllPointTags();
    };

    $scope.loadProjectTasks = function () {
      Project.tasks({projectId: $scope.currentSprintProject.id}, function (response) {
        $scope.tasks = response.data;
        tasksLoaded = true;
      });
    };

    $scope.loadAllPointTags = function () {
      Workspace.get({path: 'tags'}, function (response) {
        $scope.allPointTags = Points.getPointTags(response.data);
        tagsLoaded = true;
      });
    };

    $scope.tasksLoaded = function () {
      return tasksLoaded;
    }

    $scope.tagsLoaded = function () {
      return tagsLoaded;
    };

    $scope.calculateTotal = function() {
      var pointValues = _.values($scope.pointsByTaskId);
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
