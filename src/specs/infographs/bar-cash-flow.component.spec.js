/* jshint -W117, -W030, -W101  */
require('../../app/infographs/bar-cash-flow');

describe('bar-cash-flow controller', function () {
  var subject;

  beforeEach(function () {
    bard.appModule('infograph.bar-cash-flow');
    bard.inject(this, '$componentController');

    subject = $componentController('barCashFlow');
  });

  describe('onChanges', function() {
    context('items', function() {
      var items = [
        {id: 1, amount: 2.00},
        {id: 2, amount: 3.00},
        {id: 3, amount: -4.00},
        {id: 4, amount: 5.00},
        {id: 5, amount: -2.50},
        {id: 7, amount: -1.05}
      ];
      beforeEach(function() {
        subject.$onChanges({
          items: {
            currentValue: items
          }
        });
      });

      it('should populate data with total for income and expenses', function() {
        expect(subject.data[0]).to.eql([7.55, 10]);
      });
    });
  });
});
