'use strict';

angular.module('sprintBoardApp')
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

    $scope.setPointTag = function (pointTag) {
      $scope.resetPointTags();
      Task.addTag({taskId: $scope.task.id}, {data: {tag: pointTag.id}}, function (response) {
        if (response.$resolved) {
          $scope.points = Points.forTask([pointTag]);
          $scope.pointsByTaskId[$scope.task.id] = $scope.points;
        } else {
          console.log("Oh noes, an error occurred.");
        }
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
      Task.removeTag({taskId: $scope.task.id}, {data: {tag: pointTagId}});
    };

    $scope.shouldHighlightPoints = function (points) {
      return points > 0;
    };

    $scope.pointValue = function (pointTag) {
      return Points.tagPointValue(pointTag);
    };

  }]);
