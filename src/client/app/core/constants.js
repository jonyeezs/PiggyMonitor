/* global toastr:false, moment:false, _:false */
(function() {
  'use strict';

  angular
      .module('app.core')
      .constant('toastr', toastr)
      .constant('_', _)
      .constant('moment', moment)
      .constant('occurances', ['daily', 'weekly', 'fortnightly', 'monthly', 'quarterly', 'semiannual', 'annually']);
})();
