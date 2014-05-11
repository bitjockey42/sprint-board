'use strict';

angular.module('kanbanBoardApp')
  .controller('TaskCtrl', ['$scope', 'Task', 'Points', function ($scope, Task, Points) {
    var taskPointsLoaded = false;

    $scope.loadTaskPoints = function () {
      Task.tags({taskId: $scope.task.id}, function (response) {
        $scope.points = Points.forTask(response.data);
        $scope.pointsByTaskId[$scope.task.id] = $scope.points;
        $scope.pointTags = Points.getPointTags(response.data);
        taskPointsLoaded = true;
      });
    };

    $scope.taskPointsLoaded = function () {
      return taskPointsLoaded;
    };

    $scope.setPointTag = function () {
      $scope.resetPointTags();
      Task.addTag({taskId: $scope.task.id}, {data: {tag: $scope.pointTag.id}}, function (response) {
        $scope.points = $scope.taskPoints([$scope.pointTag]);
        $scope.pointsByTaskId[$scope.task.id] = $scope.points;
      });
    };

    $scope.resetPointTags = function () {
      $scope.pointTags.forEach(function (pointTag) {
        $scope.removePointTag(pointTag.id);
      });
      $scope.points = 0;
      $scope.pointsByTaskId[$scope.task.id] = $scope.points;
    };

    $scope.removePointTag = function (pointTagId) {
      Task.removeTag({taskId: $scope.task.id}, {data: {tag: pointTagId}}, function (response, status) {

      });
    };
  }]);
