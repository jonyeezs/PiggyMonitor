/* jshint -W117, -W030 */
describe('Article-setup Service', function () {
  var subject;

  beforeEach(function () {
    module('app.core');
    module('app.widgets');

    bard.inject(this, '_', 'occurances', 'categoryFactory');

    bard.mockService(categoryFactory, {
      createLabels: undefined
    });

    bard.inject(this, 'ArticleSetup');
    subject = ArticleSetup;
  });

  describe('getColumns', function () {
    describe('with items', function () {
      it('should call update the categories', function () {
        subject.getColumns('ledger', [1, 2, 3]);
        expect(categoryFactory.createLabels).to.have.been.called;
      });
    });

    context('getOptions', function () {
      it('should call the function from the service', function () {
        var user = {
          getOccurances: function () { return 'wrongcall'; },
          getColumns: subject.getColumns
        };

        var columns = user.getColumns('budget');
        var result = _.find(columns, ['prop', 'occurance']).getOptions();

        expect(result).not.to.eql('wrongcall');
      });
    });
  });

  describe('categories', function () {
    it('should return the most updated categories on getColumn', function () {
      var columns = subject.getColumns('budget');
      var result = _.find(columns,['prop', 'category']).getOptions();

      expect(result).to.eql([]);
      categoryFactory.createLabels.restore();
      sinon.stub(categoryFactory, 'createLabels').returns(['a', 'b', 'c', 'd']); //NOTE: sinon on bower seems to be broken
      subject.setCategories(['random']);

      var result = _.find(columns,['prop', 'category']).getOptions();
      expect(result).to.eql(['a', 'b', 'c', 'd']);
    });
  })
});
