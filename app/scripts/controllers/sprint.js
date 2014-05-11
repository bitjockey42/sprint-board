'use strict';

angular.module('kanbanBoardApp')
  .controller('SprintCtrl', ['$scope', 'Workspace', 'Project', 'WORKSPACE_ID', function ($scope, Workspace, Project, WORKSPACE_ID) {
    
    $scope.sprintProjects = [];
    $scope.currentSprintProject = "None";

    var sprintProjectsLoaded = false;

    $scope.sprintProjectsLoaded = function () {
      return sprintProjectsLoaded;
    };

    $scope.loadSprintProjects = function () {
      Workspace.projects({}, function (response, status) {
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
      $scope.$broadcast("currentSprintProjectSet");
    };

}]);
