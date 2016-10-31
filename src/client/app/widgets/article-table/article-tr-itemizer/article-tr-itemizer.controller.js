(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleItemizerController', articleItemizerController);

  articleItemizerController.$inject = ['_', 'Budget'];
  function articleItemizerController(_ , Budget) {
    /* jshint validthis: true */
    var vm = this;
    vm.item = {};
    vm.save = save;
    vm.cancel = cancel;

    function save(formIsValid) {
      if (formIsValid) {
        vm.adding = true;
        Budget.add(vm.year, vm.item)
        .then(function() {
        })
        .finally(function() {
          vm.onCreate();
          vm.adding = false;
        });
      }
    }

    function cancel() {
      vm.onCreate();
    }
  }
})();
