/* jshint -W117, -W030 */
describe('budgetHelper service', function () {
  var subject;
  var fakeResult;
  beforeEach(function () {
    module('app.budget');

    bard.inject(this, 'budgetHelper');

    subject = budgetHelper;
  });

  describe('splitToIncomeAndExpense', function () {
    var results;
    context('items have both income and expenses', function () {
      beforeEach(function () {
        var items = [{
            amount: 2.00
          }, {
            amount: -12.23
          }, {
            amount: 3.44
          }, {
            amount: -0.9
          }, {
            amount: -8.88
          }]; // only concern about amount
        results = subject.splitToIncomeAndExpense(items);
      });

      it('should map items to incomes and expenses', function () {
        expect(results.incomes).to.have.length(2);
        expect(results.expenses).to.have.length(3);
      });
    });

    context('items has only one group available', function () {
      beforeEach(function () {
        var items = [{
            amount: 2.00
          }, {
            amount: 3.44
          }]; // only need to mock amount
        results = subject.splitToIncomeAndExpense(items);
      });

      it('should only map the available and have the other as an empty array', function () {
        expect(results.incomes).to.have.length(2);
        expect(results.expenses).to.have.length(0);
      });
    });
  });

  describe('getOccurances', function () {
    var results;
    beforeEach(function () {
      var items = [{
          occurance: 'monthly'
        }, {
          occurance: 'monthly'
        }, {
          occurance: 'yearly'
        }, {
          occurance: 'monthly'
        }, {
          occurance: 'annually'
        }, {
          occurance: 'monthly'
        }];

      results = subject.getOccurances(items);
    });

    it('should only return the unique keyvalue pair and default', function () {
      expect(results).to.have.length(4);
      expect(results).to.deep.contains.members([{
          key: 'monthly',
          value: 'monthly'
        }, {
          key: 'yearly',
          value: 'yearly'
        }, {
          key: 'annually',
          value: 'annually'
        }]);
      expect(results[0].key).to.equal('default occurance');
      expect(results[0].value).to.be.null;
    });
  });
});
