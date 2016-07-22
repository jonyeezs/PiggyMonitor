/* jshint -W117, -W030 */
describe('side-bar service', function () {
  var subject;
  var labelsTestCase = ['label1', 'label2'];
  var viewTestCase;

  beforeEach(function () {
    bard.appModule('app.sidebar');
    bard.inject(this, 'sidebar', '_', '$rootScope', 'exception', 'categoryFactory');

    sinon.stub(categoryFactory, 'createLabels').returns(labelsTestCase);

    subject = sidebar;
  });

  context('budget view option', function () {
    beforeEach(function () {
      viewTestCase = subject.views.Budget;
    });

    describe('views', function () {
      it('should have defined properties', function () {
        expect(viewTestCase).to.exist;
      });
    });

    //NOTE if you want to really test if all elements have a particular property, you can use chai-things
    describe('renderOptions', function () {
      it('should return categories metadata for side-bar', function () {
        var mockItems = ['some', 'fake', 'stuff'];
        var result = subject.renderOptions(mockItems, viewTestCase);
        expect(result[0]).to.be.eql({
          name: 'all',
          icon: 'all all-side',
          content: 'all'
        });
        expect(result).to.have.length(labelsTestCase.length + 1);
      });
    });
  });

  context('default view option', function () {
    beforeEach(function () {
      viewTestCase = 'doesnotexist';
    });

    describe('renderOptions', function () {
      it('should return categories metadata for side-bar', function () {
        var mockItems = ['some', 'fake', 'stuff'];
        var result = subject.renderOptions(mockItems, viewTestCase);
        expect(result).to.have.length(1);
        expect(result[0]).to.be.eql({
          name: 'unavailable',
          content: '<b>404</b>'
        });
      });
    });
  });
});
