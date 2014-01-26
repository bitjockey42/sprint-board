'use strict';

var setupFakeApi = function (fakeApiObject, options) {
  fakeApiObject.
    when(options.method, options.url).
    respond({});
};

describe('Service: Asana', function () {
  var fakeAsanaAPI;

  beforeEach(module('Asana'));

  beforeEach(inject(function ($injector) {
    fakeAsanaAPI = $injector.get('$httpBackend');
  }));

  afterEach(function () {
    fakeAsanaAPI.verifyNoOutstandingExpectation();
    fakeAsanaAPI.verifyNoOutstandingRequest();
  });

  describe('Task', function () {
    var Task;
    beforeEach(inject(function ($injector) {
      setupFakeApi(fakeAsanaAPI, { method: 'GET', url: 'https://app.asana.com/api/1.0/tasks'});
      Task = $injector.get('Task');
    }));

    describe('.get', function () {
      it('retrieves the tasks', function () {
        Task.get();
        fakeAsanaAPI.expectGET('https://app.asana.com/api/1.0/tasks');
        fakeAsanaAPI.flush();        
      });
    });
  });

  describe('Project', function () {
    var Project;
    beforeEach(inject(function ($injector) {
      setupFakeApi(fakeAsanaAPI, { method: 'GET', url: 'https://app.asana.com/api/1.0/projects/123/tasks' });
      setupFakeApi(fakeAsanaAPI, { method: 'GET', url: 'https://app.asana.com/api/1.0/projects/123' });
      Project = $injector.get('Project');
    }));

    describe('.get', function () {
      it('retrieves the project', function () {
        Project.get({projectId: 123});
        fakeAsanaAPI.expectGET('https://app.asana.com/api/1.0/projects/123');
        fakeAsanaAPI.flush();
      });
    });

    describe('.tasks', function() {
      it('retrieves the tasks in the project', function () {
        Project.tasks({projectId: 123});
        fakeAsanaAPI.expectGET('https://app.asana.com/api/1.0/projects/123/tasks');
        fakeAsanaAPI.flush();
      });
    });
  });
});

