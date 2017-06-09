// Add all the providers that are registered in the core app. ie: src/core/
// The core app isn't included to allow modular testing
// Make sure the libraries used are also included in the karma.config.js > files
//
// TODO decouple the modules more from the core.app

(function(lodash, moment) {

  var global = (function() { return this; })();
  var thatAppModule = global.bard.appModule;

  global.bard.appModule = function appModule() {
    var args = Array.prototype.slice.call(arguments, 0);
    args = args.concat(_Provider, momentProvider, configProvider, occurancesProvider);
    return thatAppModule.apply(global.bard, args);
  }

  function _Provider($provide) {
    $provide.provider('_', function() {
      this.$get = function () { return lodash; };
    });
  }

  function momentProvider($provide) {
    $provide.provider('moment', function() {
      this.$get = function () { return moment; };
    });
  }

  function configProvider($provide) {
    $provide.provider('config', function() {
      this.$get = function() { return {
        appTitle: 'unit test',
        dataUrl: 'http://testproxy'
      }; };
    });
  }

  function occurancesProvider($provide) {
    $provide.provider('occurances', function() {
      this.$get = function() { return ['daily', 'weekly', 'fortnightly', 'monthly', 'quarterly', 'semiannual', 'annually']; };
    });
  }
})(_, moment);
