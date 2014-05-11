'use strict';

angular.module('kanbanBoardApp')
  .controller('SprintCtrl', ['$scope', 'Workspace', function ($scope, Workspace) {
    
    $scope.sprintProjects = [];
    $scope.currentSprintProject = "";

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

    $scope.setCurrentSprintProject = function () {
      $scope.currentSprintProject = $scope.sprintProject;
    };

  }]);
