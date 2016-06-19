/* jshint -W117, -W030 */
describe('budget.controller', function() {
  var controller;
  var availableYears = ['2016', '2017'];
  var items;

  beforeEach(function() {
    bard.appModule('app.budget');
    bard.inject(this, '$controller', '$q', '$rootScope', 'budgetService');

    bard.mockService(budgetService, {
      getYears: $q.when(availableYears),
      getByYear: $q.when(items)
    });

    controller = $controller('BudgetController');
    $rootScope.$apply();
  });

  describe('activate', function() {
    it('should not update the budget', function() {
      expect(controller.isBudgetUpdated()).to.be.false;
    });

    it('should populate availableYears', function() {
      expect(controller.availableYears).to.have.members(availableYears);
    });

    it('should minimize all tables', function() {
      expect(controller.incomeTable.status.open).to.be.false;
      expect(controller.expenseTable.status.open).to.be.false;
    });
  });

  describe('selectYear', function() {
    var selectedYear = '2016';

    describe('returns valid results', function() {
      beforeEach(function() {
        controller.incomeTable.status.open = false;
        controller.expenseTable.status.open = false;
        items = [{amount: 2.00}, {amount: -12.23}, {amount: 3.44}, {amount: -0.9}]; // only need to mock amount
        controller.selectYear(selectedYear);
        $rootScope.$apply();
      });

      it('should get budget item by selected year', function() {
        expect(controller.selectedYear).to.equal(selectedYear);
        expect(budgetService.getByYear).to.have.been.calledWith(selectedYear);
      });

      it('should update allItems array', function() {
        expect(controller.allItems).to.have.lengthOf(items.length);
        expect(controller.isBudgetUpdated()).to.be.true;
      });

      it('should map allItems to income and expense', function() {
        expect(controller.incomeTable.status.open).to.be.true;
        expect(controller.expenseTable.status.open).to.be.true;
        expect(controller.incomeTable.items).to.have.lengthOf(2);
        expect(controller.expenseTable.items).to.have.lengthOf(2);
      });
    });
  });
});
