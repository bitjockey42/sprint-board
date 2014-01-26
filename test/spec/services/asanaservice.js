'use strict';

describe('Service: Asanaservice', function () {

  // load the service's module
  beforeEach(module('kanbanBoardApp'));

  // instantiate service
  var Asanaservice;
  beforeEach(inject(function (_Asanaservice_) {
    Asanaservice = _Asanaservice_;
  }));

  it('should do something', function () {
    expect(!!Asanaservice).toBe(true);
  });

});
