'use strict';

angular.module('kanbanBoardApp')
  .controller('TaskCtrl', ['$scope', 'Task', function ($scope, Task) {
    $scope.taskPoints = [];
    var taskPointsLoaded = false;

    $scope.taskPointsLoaded = function () {
      return taskPointsLoaded;
    };

    $scope.loadTaskPoints = function () {
      Task.tags({taskId: $scope.task.id}, function (response) {
        $scope.points = $scope.taskPoints(response.data);
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
        if (tag.name.match(/points/)) {
          return tag;
        }
      });
    };
    
    $scope.tagPointValue = function (tag) {
      return parseInt(tag.name.replace(/[^\d+]/g, ''));
    }
  }]);
