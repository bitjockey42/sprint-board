'use strict';

angular.module('kanbanBoardApp')
  .controller('BoardCtrl', ['$scope', 'Task', 'Project', 'WORKSPACE_ID', 'PROJECT_ID', function ($scope, Task, Project, WORKSPACE_ID, PROJECT_ID) {
    $scope.tasks = Task.get({workspace: WORKSPACE_ID, assignee: 'me'});
    $scope.projectTasks = Project.tasks({projectId: PROJECT_ID});
  }]);
