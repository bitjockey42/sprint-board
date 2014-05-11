'use strict';

angular.module('kanbanBoardApp')
  .controller('TaskCtrl', ['$scope', 'Task', function ($scope, Task) {
    var taskPointsLoaded = false;

    $scope.taskPointsLoaded = function () {
      return taskPointsLoaded;
    };

    $scope.loadTaskPoints = function () {
      Task.tags({taskId: $scope.task.id}, function (response) {
        $scope.points = $scope.taskPoints(response.data);
        $scope.pointsByTaskId[$scope.task.id] = $scope.points;
        $scope.pointTags = $scope.getPointTags(response.data);
        taskPointsLoaded = true;
      });
    };

    $scope.taskPoints = function (tags) {
      var pointTags = $scope.getPointTags(tags);
      var pointValue = 0;
      if (pointTags.length > 0) {
        pointValue = $scope.tagPointValue(pointTags[0]);
      }
      return pointValue;
    };

    $scope.getPointTags = function (tags) {
      return tags.filter( function (tag) {
        if (tag.name.match(/point/)) {
          return tag;
        }
      });
    };
    
    $scope.tagPointValue = function (tag) {
      return parseInt(tag.name.replace(/[^\d+]/g, ''));
    }

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
