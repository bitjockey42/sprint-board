'use strict';

angular.module('kanbanBoardApp')
  .controller('PointsCtrl', ['$scope', 'Workspace', 'Tag', 'WORKSPACE_ID', function ($scope, Workspace, Tag, WORKSPACE_ID) {
    $scope.tags = [];
    var tagsLoaded = false;

    $scope.tagsLoaded = function () {
      return tagsLoaded;
    };

    $scope.loadTags = function () {
      Workspace.get({path: 'tags'}, function (response) {
        $scope.tags = response.data;
        tagsLoaded = true;
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
