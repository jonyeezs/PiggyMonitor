(function () {

  angular
    .module('app.edi-table')
    .factory('EdiTdMultiSelection', ediTdMultiSelection);

  ediTdMultiSelection.$inject = [];
  /* @ngInject */
  function ediTdMultiSelection() {
    var registeredEdiTd = {};

    var service = {
      register: register,
      unregister: unregister,
      updateValue: updateValue
    };

    return service;

    function register(callback, prop) {
      if (registeredEdiTd[prop] == null) {
        registeredEdiTd[prop] = [];
      }
      return registeredEdiTd[prop].push(callback) - 1;
    }

    function unregister(prop, index) {
      delete registeredEdiTd[prop][index];
      if (registeredEdiTd[prop].every(function (data) {return data == null;})) delete registeredEdiTd[prop];
      return null;
    }

    function updateValue(prop, mainDataIndex, value) {
      if (registeredEdiTd[prop] == null) return;
      registeredEdiTd[prop].forEach(function (callback, index) {
        if (index !== mainDataIndex) callback(value);
      });
    }
  }
})();
