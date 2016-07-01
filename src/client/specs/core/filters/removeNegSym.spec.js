/* jshint -W117, -W030 */
describe('removeNegSym filter', function() {
    var filter;
    beforeEach(function () {
        module('app.core');

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
  });
