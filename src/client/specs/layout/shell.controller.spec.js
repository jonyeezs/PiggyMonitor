/* jshint -W117, -W030 */
describe('ShellController', function() {
  var subject;

  beforeEach(function() {
    bard.appModule('app.layout');
    bard.inject(this, '$controller', '$q', '$rootScope', '$timeout', 'dataService');
  });

  beforeEach(function () {
    subject = $controller('ShellController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Shell controller', function() {
    it('should be created successfully', function () {
      expect(subject).to.be.defined;
    });

    it('should show splash screen', function () {
      expect($rootScope.showSplash).to.be.true;
    });

    it('should hide splash screen after timeout', function (done) {
      $timeout(function() {
        expect($rootScope.showSplash).to.be.false;
        done();
      }, 1000);
      $timeout.flush();
    });
  });
});
