/* jshint -W117, -W030 */
require('../../app/repositories/backend-connector.service');

describe('backend-connector service', function () {
  var subject;

  beforeEach(function () {
    bard.appModule('backend-connector');

    bard.inject(this, '$httpBackend', 'config');

    config.dataUrl = 'http://fake';
    bard.inject(this, 'data'); //FIXME why can't have this with the rest of the other inject dep
    subject = data;
  });

  describe('GET', function () {
    describe('successful response', function () {
      var successfulResponse = 'stuff';
      beforeEach(function () {
        $httpBackend
        .whenGET(/.+/i)
        .respond({content: successfulResponse});
      });

      it('should get resource without query', function () {
        subject.get('resource');
        $httpBackend.expectGET('http://fake/resource');
        $httpBackend.flush();
      });

      it('should get resource with query', function () {
        subject.get('resources', {orderBy: 'size'});
        $httpBackend.expectGET('http://fake/resources?orderBy=size');
        $httpBackend.flush();
      });

      it('should respond with the content', function (done) {
        var result = '';
        subject.get('resources')
        .then(function(response) {
          result = response;
        })
        .finally(done);
        $httpBackend.flush();
        expect(result).to.be.equals(successfulResponse);
      });
    });

    // describe('failed response', function () {
    //   var exceptionCatcher;
    //   beforeEach(function () {
    //     exceptionCatcher = sinon.spy(exception, 'catcher');
    //     $httpBackend
    //     .whenGET(/.+/i)
    //     .respond(400, {message: 'error'});
    //   });
    //
    //   it('should send an exception', function (done) {
    //     var error;
    //     subject.get('resource')
    //     .catch(function (error) {
    //       error = error;
    //     })
    //     .finally(done);
    //     $httpBackend.flush();
    //     expect(exceptionCatcher).to.have.been.called;
    //     expect(error).to.be.defined;
    //   });
    // });
  });
});
