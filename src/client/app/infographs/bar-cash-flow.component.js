(function () {
  angular
    .module('app.infographs')
    .component('barCashFlow', {
      template: '<div class="chart-container"><canvas ng-if="$ctrl.labels.length > 0" class="chart-horizontal-bar" chart-options="$ctrl.config" chart-data="$ctrl.data" chart-labels="$ctrl.labels"></canvas></div>',
      controller: barCashFlowCtrl,
      bindings: {
        items: '<'
      }
    });

  barCashFlowCtrl.$inject = ['_'];

  function barCashFlowCtrl(_) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.labels = ['out', 'in'];
      ctrl.config = {
        responsive: true,
        maintainAspectRatio: false
      };
    }

    ctrl.$onChanges = function (changes) {
      if (changes.items && changes.items.currentValue) {
        let income = get_income(changes.items.currentValue);
        let expenses = get_expenses(changes.items.currentValue);
        ctrl.data = [[expenses, income]];
      }
    }

    function get_income(items) {
      return _(items).filter(function (items) {
          return items.amount >= 0;
        })
        .reduce(function (total, item) {
          return total + item.amount;
        }, 0);
    }

    function get_expenses(items) {
      return _(items).filter(function (items) {
          return items.amount < 0;
        })
        .reduce(function (total, item) {
          return total + Math.abs(item.amount);
        }, 0);
    }
  }
})();
