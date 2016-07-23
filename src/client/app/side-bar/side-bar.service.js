(function () {
  'use strict';

  angular
      .module('app.sidebar')
      .factory('sidebar', sidebarservice);

  sidebarservice.$inject = ['_', '$rootScope', 'categoryFactory'];
  /* @ngInject */
  function sidebarservice(_, $rootScope, categoryFactory) {

    // property and value are case sensitive
    var views = {
      Budget: 'Budget'
    };

    var categoryOptions = [];

    var service = {
      renderOptions: renderOptions,
      views: views
    };
    return service;

    /**
     * creates an array of options base on the unique labels found in the items
     * @method renderOptions
     * @param  {{category: string}[]} items - list of item objects with minimum property category
     * @param  {sidebar.views}      viewType viewType from sidebar.views
     * @return {{name:string,icon:string,content:string}[]}   contains the display name, glyphicon, and the content type
     */
    function renderOptions(items, viewType) {
      var list = [];
      switch (viewType) {
        case views.Budget:
          categoryOptions = categoryFactory.createLabels(items);
          list = _.map(categoryOptions, createBudgetOption);
          list.unshift({
            name: 'all',
            icon: 'all all-side',
            content: 'all'
          });
          break;
        default:
          list = [{
            name: 'unavailable',
            content: '<b>404</b>'
          }];
      }
      return list;
    }

    function createBudgetOption(optionName) {
      return {
        name: optionName,
        icon: optionName + ' ' + optionName + '-side',
        content: optionName
      };
    }
  }
})();
