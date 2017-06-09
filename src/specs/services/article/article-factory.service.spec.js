/* jshint -W117, -W030 */
require('../../../app/services/article');

describe('Article-factory', function () {
  var subject;

  beforeEach(function () {
    bard.appModule('svc.article');

    bard.inject(this, 'occurances', 'categoryFactory');

    bard.mockService(categoryFactory, {
      createLabels: undefined
    });

    bard.inject(this, 'articleFactory');
    subject = articleFactory;
  });

  describe('getColumnConfig', function () {
    describe('with items', function () {
      it('should call update the categories', function () {
        subject.getColumnConfig('ledger', [1, 2, 3]);
        expect(categoryFactory.createLabels).to.have.been.called;
      });
    });

    context('getOptions', function () {
      it('should call the function from the service', function () {
        var user = {
          getOccurances: function () { return 'wrongcall'; },
          getColumnConfig: subject.getColumnConfig
        };

        var columns = user.getColumnConfig('budget');
        var result = _.find(columns, ['prop', 'occurance']).options;

        expect(result).not.to.eql('wrongcall');
      });
    });
  });

  describe('categories', function () {
    it('should return the most updated categories on getColumn', function () {
      var columns = subject.getColumnConfig('budget');
      var result = _.find(columns,['prop', 'category']).options;

      expect(result).to.eql([]);

      categoryFactory.createLabels.restore();
      //NOTE: sinon on bower seems to be broken
      sinon.stub(categoryFactory, 'createLabels').returns(['a', 'b', 'c', 'd']);
      var columns = subject.getColumnConfig('budget', [{}, {}, {}]);

      result = _.find(columns,['prop', 'category']).options;
      expect(result).to.eql(['a', 'b', 'c', 'd']);
    });
  });
});
