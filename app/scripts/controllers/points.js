'use strict';

angular.module('kanbanBoardApp')
  .controller('PointsCtrl', ['$scope', 'Workspace', 'Tag', 'WORKSPACE_ID', function ($scope, Workspace, Tag, WORKSPACE_ID) {
    $scope.tags = Workspace.get({path: 'tags'});  
  }]);