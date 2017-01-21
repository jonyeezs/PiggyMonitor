(function () {
  angular
    .module('app.infographs')
    .component('barSummaryCompare', {
      template: '<div class="chart-container"><canvas ng-if="$ctrl.labels.length > 0" class="chart chart-bar" chart-options="$ctrl.config" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-series="$ctrl.series"></canvas></div>',
      controller: barCompareCtrl,
      bindings: {
        actual: '<',
        year: '<'
      }
    });

  barCompareCtrl.$inject = ['Budget', '_'];

  function barCompareCtrl(Budget, _) {
    var ctrl = this;
    let actual_totals;

    ctrl.$onInit = function () {
      ctrl.series = ['Actual', 'Budget'];
      ctrl.config = {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            type: 'logarithmic',
            display: true,
            ticks: {
              min: 10
            }
          }]
        }
      };
    }

    ctrl.$onChanges = function (changes) {
      if (changes.actual && changes.actual.isFirstChange()) {
        ctrl.data = [[], []];
      }

      if (changes.year && changes.year.isFirstChange()) {
        ctrl.labels = [];
      }
      if (changes.actual && changes.actual.currentValue) {
        actual_totals = summarize(changes.actual.currentValue);
        populateActual();
      }

      if (changes.year && changes.year.currentValue) {
        Budget.getStatement(changes.year.currentValue, 'annually')
        .then(function(breakdowns) {
          ctrl.labels = breakdowns.map(function(item) { return item.category; });

          var budget_totals = ctrl.labels.map(function (category) {
            var breakdown = _.find(breakdowns, {category: category});
            var occurance = _.find(breakdown.occurances, {type: 'annually'});
            return Math.abs(occurance.amount);
          });
          ctrl.data[1] = budget_totals;
        })
        .finally(function () {
          populateActual();
        });
      }
    }

    function populateActual() {
      if (actual_totals && ctrl.labels.length > 0) {
        ctrl.data[0] = ctrl.labels.map(function (category) {
          var foundItem = _.find(actual_totals, {category: category});
          return foundItem ? foundItem.total : 0;
        });
      }
    }

    function summarize(actual) {
      var breakdowns = _.groupBy(actual, function (item) { return item.category});
      return Object.keys(breakdowns).map(function (category) {
        var total = _.reduce(breakdowns[category], function(total, item) {return total + item.amount}, 0);
        return {
          category: category,
          total: Math.abs(total)
        };
      });
    }
  }
})();
