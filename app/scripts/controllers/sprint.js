'use strict';

angular.module('sprintBoardApp')
  .controller('SprintCtrl', ['$scope', 'Workspace', function ($scope, Workspace) {
    
    $scope.sprintProjects = [];
    $scope.currentSprintProject = '';

    var sprintProjectsLoaded = false;

    $scope.sprintProjectsLoaded = function () {
      return sprintProjectsLoaded;
    };

    $scope.loadSprintProjects = function () {
      Workspace.projects({}, function (response) {
        $scope.sprintProjects = $scope.filterSprintProjects(response.data);
        sprintProjectsLoaded = true;
      });
    };

    $scope.filterSprintProjects = function (projects) {
      return projects.filter(function (project) {
        return project.name.match(/(S|s)print/);
      });
    };

    $scope.setCurrentSprintProject = function (sprintProject) {
      $scope.currentSprintProject = sprintProject;
    };

    $scope.calculateTotal = function() {
      var pointValues = _.values($scope.pointsByTaskId);
      return pointValues.reduce( function(a,b) {
        return a + b;
      });
    };

    $scope.$watch('currentSprintProject', function (newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      } else {
        $scope.pointsByTaskId = {};
        $scope.$broadcast('sprintProjectChanged');
      }
    });

  }]);
