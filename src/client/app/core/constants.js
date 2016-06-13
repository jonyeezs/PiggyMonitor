/* global toastr:false, moment:false, _:false */
(function() {
  'use strict';

  angular
      .module('app.core')
      .constant('toastr', toastr)
      .constant('_', _)
      .constant('moment', moment);
})();
