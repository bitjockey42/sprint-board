'use strict';

angular.module('sprintBoardApp')
  .controller('BoardCtrl', ['$scope', 'Project', 'Workspace', 'Points', function ($scope, Project, Workspace, Points) {

    $scope.tasks = [];
    $scope.allPointTags = [];
    var tasksLoaded = false;
    var tagsLoaded = false;

    $scope.$on('sprintProjectChanged', function () {
      $scope.init();
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
    };

    $scope.tagsLoaded = function () {
      return tagsLoaded;
    };

    $scope.isProjectHeader = function (task) {
      if (task.name.match(/:$/)) {
        return true;
      } else {
        return false;
      }
    };

  }]);
