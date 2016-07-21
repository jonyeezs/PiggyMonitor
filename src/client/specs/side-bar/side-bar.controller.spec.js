/* jshint -W117, -W030 */
describe('side-bar controller', function () {
  var subject;
  var expectedResult;

  beforeEach(function () {
    bard.appModule('app.sidebar');
    bard.inject(this, '$controller', '$rootScope', 'sidebar');

    expectedResult = [{
      icon: 'trash',
      content: '1'
    }, {
      icon: 'clown',
      content: 'fake'
    }];
    sinon.stub(sidebar, 'renderOptions').returns(expectedResult);

    var mockItems = [{
      type: '1'
    }, {
      type: 'fake'
    }];
    subject = $controller('SidebarController', { /* no locals */ }, {
      items: mockItems
    });
    $rootScope.$apply();
  });

  describe('activate', function () {
    it('should populate vm.navOptions with output from sidebar service', function () {
      expect(sidebar.renderOptions).to.have.been.called;
      expect(subject.navOptions).to.eql(expectedResult);
    });
  });
});
