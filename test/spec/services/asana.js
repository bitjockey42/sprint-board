'use strict';

describe('Service: Asana', function () {

  // load the service's module
  beforeEach(module('kanbanBoardApp'));

  // instantiate service
  var Asana;
  beforeEach(inject(function (_Asana_) {
    Asana = _Asana_;
  }));

  it('should do something', function () {
    expect(!!Asana).toBe(true);
  });

});
