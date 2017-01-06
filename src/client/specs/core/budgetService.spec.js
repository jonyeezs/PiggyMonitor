/* jshint -W117, -W030 */
describe('budget service', function () {
  var subject;
  var fakeResult;
  beforeEach(function () {
    module('app.core');

    bard.inject(this, '$q', '$rootScope', 'Budget', 'dataService');

    bard.mockService(dataService, {
      get: $q.when(fakeResult),
      patch: $q.resolve()
    });

    subject = Budget;
  });

  describe('getYears', function () {
    var subjectPromise;
    beforeEach(function () {
      fakeResult = {
        years: ['2020', '2030']
      };

      subjectPromise = subject.getYears();
    });

    it('should send a GET call to dataservice with year', function () {
      expect(dataService.get).to.be.calledWith('budgets/years');
    });

    it('should return a promise that resolves with a years property', function (done) {
      var subjectResult;
      subjectPromise.then(function (result) {
          subjectResult = result;
        })
        .catch(function () {
          subjectResult = 'error';
        })
        .finally(function () {
          expect(subjectResult).to.exist;
          done();
        });

      $rootScope.$apply();
    });
  });

  describe('getByYear', function () {
    var subjectPromise;
    var testYear = '2016';
    beforeEach(function () {
      fakeResult = {
        items: [{}, {}]
      };

      subjectPromise = subject.getByYear(testYear);
    });

    it('should send a GET call to dataservice with specified year', function () {
      expect(dataService.get).to.be.calledWith('budgets/years/' + testYear);
    });

    it('should return a promise that resolves with a years property', function (done) {
      var subjectResult;
      subjectPromise.then(function (result) {
          subjectResult = result;
        })
        .catch(function () {
          subjectResult = 'error';
        })
        .finally(function () {
          expect(subjectResult).to.exist;
          done();
        });
      $rootScope.$apply();
    });
  });

  describe('getByYearWithOccurance', function () {
    var subjectPromise;
    var testYear = '2016';
    var someOccuranceType = 'monthly daily somethinglikethat';
    beforeEach(function () {
      fakeResult = {
        items: [{}, {}]
      };

      resultPromise = subject.getByYearWithOccurance(testYear, someOccuranceType);
    });

    it('should send a GET call to dataservice with specified year', function () {
      expect(dataService.get).to.be.calledWith('budgets/years/' + testYear, {
        occurance: someOccuranceType
      });
    });

    it('should return a promise that resolves with a years property', function (done) {
      var subjectResult;
      resultPromise.then(function (result) {
          subjectResult = result;
        })
        .catch(function () {
          subjectResult = 'error';
        })
        .finally(function () {
          expect(subjectResult).to.exist;
          done();
        });
      $rootScope.$apply();
    });
  });

  describe('update', function () {
    it('should accept array of items by year', function () {
      var resultPromise = subject.update('2016', {
        description: 'something',
        category: 'income',
        occurance: 'monthly',
        amount: '23.00'
      });

      expect(dataService.patch).to.be.calledWith('budgets/years/2016');
      expect(dataService.patch.args[0][1]).to.be.an('array');
    });
  });
});
