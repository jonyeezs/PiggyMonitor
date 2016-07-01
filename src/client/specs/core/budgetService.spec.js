/* jshint -W117, -W030 */
describe('budget service', function() {
    var subject;
    var fakeResult;
    beforeEach(function () {
        module('app.core');

        bard.inject(this, '$q', '$rootScope', 'budgetService', 'dataService');

        bard.mockService(dataService, {
          get: $q.when(fakeResult)
        });

        subject = budgetService;
      });

    describe('getYears', function() {
      var subjectPromise;
      beforeEach(function() {
        fakeResult = {
          years: ['2020', '2030']
        };

        subjectPromise = subject.getYears();
      });

      it('should send a GET call to dataservice with year', function () {
          expect(dataService.get).to.be.calledWith('years');
        });

      it('should return a promise that resolves with a years property', function () {
          var subjectResult;
          subjectPromise.then(function(result) {
            subjectResult = result;
          });
          $rootScope.$apply();
          expect(subjectResult).to.exist;
        });
    });

    describe('getByYear', function() {
        var subjectPromise;
        var testYear = '2016';
        beforeEach(function() {
          fakeResult = {
            items: [{}, {}]
          };

          subjectPromise = subject.getByYear(testYear);
        });

        it('should send a GET call to dataservice with specified year', function () {
            expect(dataService.get).to.be.calledWith('years/' + testYear);
          });

        it('should return a promise that resolves with a years property', function () {
            var subjectResult;
            subjectPromise.then(function(result) {
              subjectResult = result;
            });
            $rootScope.$apply();
            expect(subjectResult).to.exist;
          });
      });

    describe('getByYearWithOccurance', function() {
        var subjectPromise;
        var testYear = '2016';
        var someOccuranceType = 'monthly daily somethinglikethat';
        beforeEach(function() {
          fakeResult = {
            items: [{}, {}]
          };

          subjectPromise = subject.getByYearWithOccurance(testYear, someOccuranceType);
        });

        it('should send a GET call to dataservice with specified year', function () {
            expect(dataService.get).to.be.calledWith('years/' + testYear, { occurance: someOccuranceType });
          });

        it('should return a promise that resolves with a years property', function () {
            var subjectResult;
            subjectPromise.then(function(result) {
              subjectResult = result;
            });
            $rootScope.$apply();
            expect(subjectResult).to.exist;
          });
      });
  });
