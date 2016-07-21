/* jshint -W117, -W030 */
describe('top-nav controller', function () {
  var subject;
  var mockedNavRoutes = [{state: 'second', settings: { nav: 2}},
                         {state: 'first', settings: { nav: 1}},
                         {state: 'not-a-nav-state', settings: {}}];
  beforeEach(function() {
    bard.appModule('app.layout');
    bard.inject(this, '$controller', '$rootScope', '$state', 'routerHelper');

    sinon.stub(routerHelper, 'getStates').returns(mockedNavRoutes);

    subject = $controller('topNavController');
    $rootScope.$apply();
  });

  describe('activate', function () {
    it('should populate navRoutes ordered by nav', function () {
      expect(subject.navRoutes).to.have.deep.property('[0].state', 'first');
      expect(subject.navRoutes).to.have.deep.property('[1].state', 'second');
      expect(subject.navRoutes).to.have.length(2);
    });
  });

  describe('isCurrent', function () {
    var currentNav;
    beforeEach(function () {
      $state.current = {title: 'this is active'};
    });
    context('nav option is the current state', function () {
      it('should return current', function () {
        currentNav = {title: 'this is active'};
        expect(subject.isCurrent(currentNav)).to.equal('current');
      });
    });

    context('nav option is not the current state', function () {
      it('should return an empty string', function () {
        currentNav = {title: 'some other one'};
        expect(subject.isCurrent(currentNav)).to.be.empty;
      });
    });

    it('should return an empty string when the nav option does not have a title', function () {
      currentNav = {title: ''};
      expect(subject.isCurrent(currentNav)).to.be.empty;
    });
  });
});
