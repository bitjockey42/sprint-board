'use strict';

describe('Controller: BoardCtrl', function () {

  // load the controller's module
  beforeEach(module('kanbanBoardApp'));
  beforeEach(module('Asana'));

  var BoardCtrl, Task, Project,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $injector, $controller) {
    Task = $injector.get('Task');
    Project = $injector.get('Project');
    scope = $rootScope.$new();
    spyOn(Task, 'get');
    spyOn(Project, 'tasks');
    BoardCtrl = $controller('BoardCtrl', {
      $scope: scope,
      WORKSPACE_ID: 1,
      PROJECT_ID: 1
    });
  }));

  it('sets $scope.tasks by calling the Asana Task service', function () {
    expect(Task.get).toHaveBeenCalledWith({workspace: 1, assignee: 'me'});
  });

  it('sets the $scope.projectTasks by calling the Asana Project service', function () {
    expect(Project.tasks).toHaveBeenCalledWith({projectId: 1});
  });
});
