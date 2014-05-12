'use strict';

angular.module('sprintBoardApp')
  .service('Points', function () {
    this.forTask = function (tags) {
      var pointValue = 0;
      var pointTags = this.getPointTags(tags);
      if (pointTags.length > 0) {
        pointValue = this.tagPointValue(pointTags[0]);
      }
      return pointValue;
    };

    this.getPointTags = function (tags) {
      return tags.filter( function (tag) {
        if (tag.name.match(/point/)) {
          return tag;
        }
      });
    };

    this.tagPointValue = function (tag) {
      return parseInt(tag.name.replace(/[^\d+]/g, ''));
    };
  });
