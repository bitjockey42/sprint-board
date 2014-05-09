'use strict';

angular.module('kanbanBoardApp')
  .controller('TaskCtrl', ['$scope', 'Task', function ($scope, Task) {
    $scope.taskTags = [];
    var taskTagsLoaded = false;

    $scope.taskTagsLoaded = function () {
      return taskTagsLoaded;
    };

    $scope.loadTaskTags = function () {
      Task.tags({taskId: $scope.task.id}, function (response) {
        $scope.taskTags = response.data;
        taskTagsLoaded = true;
      });
    };
  }]);
