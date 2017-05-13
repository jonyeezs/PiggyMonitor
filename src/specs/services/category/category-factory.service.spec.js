/* jshint -W117, -W030 */
describe('Category Factory Service', function () {
  var subject;
  var testItems = [{
    name: 'cash from mah boss',
    category: 'income',
    amount: 100.00
  }, {
    name: 'car insurance',
    category: 'insurance',
    amount: -0.23
  }, {
    name: 'tithing',
    category: 'commitment',
    amount: -10.00
  }, {
    name: 'house insurance',
    category: 'insurance',
    amount: -30.00
  }];

  beforeEach(function () {
    bard.appModule('svc.category');

    bard.inject(this, 'categoryFactory');

    subject = categoryFactory;
  });

  describe('createLabels', function () {
    it('should list the destinct categories in an array', function () {
      var result = subject.createLabels(testItems);
      expect(result).to.have.length(3);
      expect(result).to.have.members(['income', 'insurance', 'commitment']);
    });
  });

  describe('createForExpense', function () {
    var expenseTotal, insuranceTotal, commitmentTotal;
    var expectedResult;

    beforeEach(function () {
      expenseTotal = 40.23;
      insuranceTotal = 30.23;
      commitmentTotal = 10;
    });

    it('should only show list of category data for amount less than 0', function () {
      expectedResult = [{
        label: testItems[1].category,
        total: insuranceTotal,
        percentage: 75
      }, {
        label: testItems[2].category,
        total: commitmentTotal,
        percentage: 25
      }];

      var result = subject.createForExpense(testItems);
      expect(result).to.have.length(expectedResult.length);
      expect(result).to.deep.include.members(expectedResult);
    });
  });

  describe('createForIncome', function () {
    var expectedResult;

    beforeEach(function () {
      var incomeTotal = testItems[0].amount;
      expectedResult = [{
        label: testItems[0].category,
        total: incomeTotal,
        percentage: 100
      }];
    });

    it('should only show list of category data for amount less than 0', function () {
      var result = subject.createForIncome(testItems);
      expect(result).to.have.length(expectedResult.length);
      expect(result).to.deep.include.members(expectedResult);
    });
  });
});
