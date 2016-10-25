/* jshint -W117, -W030 */
describe('budget.controller', function () {
  var subject;
  var availableYears = ['2016', '2017'];

  beforeEach(function () {
    bard.appModule('app.budget');
    bard.inject(this, '_', '$controller', '$q', '$rootScope', 'budget', 'budgetHelper');

    bard.mockService(budget, {
      getYears: $q.when(availableYears),
      getByYear: $q.when([])
    });

    subject = $controller('BudgetController');
    $rootScope.$apply();
  });

  describe('activate', function () {
    it('should populate availableYears', function () {
      expect(subject.availableYears).to.deep.have.members([{
        key: availableYears[0],
        value: availableYears[0]
      }, {
        key: availableYears[1],
        value: availableYears[1]
      }]);
    });

    it('should minimize all tables', function () {
      expect(subject.incomeTable.status.open).to.be.false;
      expect(subject.expenseTable.status.open).to.be.false;
    });
  });

  describe('selectYear', function () {
    var selectedYear = '2016';

    describe('returns valid results', function () {
      beforeEach(function () {
        subject.incomeTable.status.open = false;
        subject.expenseTable.status.open = false;
        subject.selectYear(selectedYear);
        $rootScope.$apply();
      });

      it('should get budget item by selected year', function () {
        expect(subject.selectedYear).to.equal(selectedYear);
        expect(budget.getByYear).to.have.been.calledWith(selectedYear);
      });
    });

    context('getOccurance', function () {
      var getOccurancesSpy;
      beforeEach(function () {
        getOccurancesSpy = sinon.stub(budgetHelper, 'getOccurances');
      });
      context('availableOccurances is empty', function () {
        beforeEach(function () {
          subject.availableOccurances = [];
          subject.selectYear(selectedYear);
          $rootScope.$apply();
        });

        it('should getOccurances from result', function () {
          expect(getOccurancesSpy).to.have.been.called;
        });
      });
      context('availableOccurances is not empty', function () {
        beforeEach(function () {
          subject.availableOccurances = ['values'];
          subject.selectYear(selectedYear);
          $rootScope.$apply();
        });

        it('should not execute getOccurance', function () {
          expect(getOccurancesSpy).to.not.have.been.called;
        });
      });
    });
  });
});
