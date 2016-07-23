+-/* jshint -W117, -W030 */
describe('summary-panel controller', function () {
  var subject;
  var expectedExpense;
  var expectedIncome;

  beforeEach(function () {
    bard.appModule('app.summary');
    bard.inject(this, '$controller', '_', '$rootScope', '$q', 'budget', 'categoryFactory');

    sinon.stub(budget, 'getByYearWithOccurance').returns(
      $q.resolve(['some','items','i','care','less','about','because','stubs']));

    expectedExpense = [
      {label: 'first', percentage: '50', total: 5},
      {label: 'second', percentage: '50', total: 5}];
    expectedIncome = [
      {label: 'money', percentage: '50', total: 8},
      {label: 'gifts', percentage: '50', total: 2}];

    bard.mockService(categoryFactory, {
      createForExpense: function () {return expectedExpense;},
      createForIncome: function () {return expectedIncome;}
    });
  });

  it('should have occurances', function () {
    subject = $controller('SummaryPanelController', { /* no locals */ }, {});
    $rootScope.$apply();
    expect(subject.occurances).to.exist;
  });

  describe('activate', function () {
    context('given a year', function () {
      beforeEach(function (done) {
        subject = $controller('SummaryPanelController', { /* no locals */ }, {year: '2016'});
        $rootScope.$apply();
        done();
      });

      it('should have data for expense pie chart', function () {
        expect(subject.labels).to.include.members(_.map(expectedExpense, 'label'));
        expect(subject.data).to.include.members(_.map(expectedExpense, 'percentage'));
        expect(subject.showGraph).to.be.true;
      });

      it('should have data income vs expense chart', function () {
        expect(subject.positiveflow).to.equal(sumTotal(expectedIncome));
        expect(subject.negativeflow).to.equal(sumTotal(expectedExpense));
      });

      function sumTotal(expectedItems) {
        return _.reduce(expectedItems, function(sum, n) {
          return sum + n.total;
        }, 0);
      }
    });

    context('given no year value', function () {
      beforeEach(function (done) {
        subject = $controller('SummaryPanelController', { /* no locals */ }, {year: ''});
        $rootScope.$apply();
        done();
      });

      it('should not populate any of the data variables', function () {
        expect(subject.labels).to.be.falsey;
        expect(subject.data).to.be.falsey;
        expect(subject.showGraph).to.be.false;
      });
    });
  });
});
