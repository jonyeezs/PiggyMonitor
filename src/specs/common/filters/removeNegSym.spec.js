/* jshint -W117, -W030 */
require('../../../app/common/filters/removeNegSym');

describe('removeNegSym filter', function() {
    var filter, result;
    beforeEach(bard.appModule('filter.removeNegativeSym'));

    beforeEach(function () {
        bard.inject(this, '$filter');
        filter = $filter('removeNegativeSym');
      });

    it('should remove the negative symbol', function () {
        var testCase = -12.2;

        result = filter(testCase);
        expect(result).to.be.equal(12.2);
      });

    it('should keep value intact', function () {
        var testCase = 9.88;

        result = filter(testCase);
        expect(result).to.be.equal(9.88);
      });

    describe('disable', function() {
      it('should not remove negative for negative value', function() {
        var testCase = -12.2;

        result = filter(testCase, true);

        expect(result).to.be.equal(-12.2);
      });
    });
  });
