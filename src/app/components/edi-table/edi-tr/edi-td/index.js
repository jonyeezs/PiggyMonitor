module.exports = angular
  .module('edi-tr.edi-td', [
    require('../../../../common/filters/removeNegSym')
  ]).name;

require('./edi-td.component');
