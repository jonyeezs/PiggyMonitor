/* jshint -W117, -W030 */
describe('budget.controller', function() {
  var subject;
  var availableYears = ['2016', '2017'];
  var items;

  beforeEach(function() {
    bard.appModule('app.budget');
    bard.inject(this, '$controller', '$q', '$rootScope', 'budgetService');

    bard.mockService(budgetService, {
      getYears: $q.when(availableYears),
      getByYear: $q.when(items)
    });

    subject = $controller('BudgetController');
    $rootScope.$apply();
  });

  describe('activate', function() {
    it('should not update the budget', function() {
      expect(subject.isBudgetUpdated()).to.be.false;
    });

    it('should populate availableYears', function() {
      expect(subject.availableYears).to.have.members(availableYears);
    });

    it('should minimize all tables', function() {
      expect(subject.incomeTable.status.open).to.be.false;
      expect(subject.expenseTable.status.open).to.be.false;
    });
  });

  describe('selectYear', function() {
    var selectedYear = '2016';

    describe('returns valid results', function() {
      beforeEach(function() {
        subject.incomeTable.status.open = false;
        subject.expenseTable.status.open = false;
        items = [{amount: 2.00}, {amount: -12.23}, {amount: 3.44}, {amount: -0.9}]; // only need to mock amount
        subject.selectYear(selectedYear);
        $rootScope.$apply();
      });

      it('should get budget item by selected year', function() {
        expect(subject.selectedYear).to.equal(selectedYear);
        expect(budgetService.getByYear).to.have.been.calledWith(selectedYear);
      });

      it('should update allItems array', function() {
        expect(subject.allItems).to.have.lengthOf(items.length);
        expect(subject.isBudgetUpdated()).to.be.true;
      });

      it('should map allItems to income and expense', function() {
        expect(subject.incomeTable.status.open).to.be.true;
        expect(subject.expenseTable.status.open).to.be.true;
        expect(subject.incomeTable.items).to.have.length(2);
        expect(subject.expenseTable.items).to.have.length(2);
      });
    });
  });
});
