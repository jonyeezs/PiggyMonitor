(function () {
  'use strict';

  angular
      .module('app.widgets')
      .factory('ArticleSetup', articleSetup);

  articleSetup.$inject = ['_', 'occurances', 'categoryFactory'];
  /* @ngInject */
  function articleSetup(_, occurances, categoryFactory) {
    var categories = [];

    var service = {
      getColumnConfig: getColumnConfig,
      setCategories: setCategories
    };

    return service;

    /**
     * creates the header and the columns
     * @method getColumnConfig
     * @param  {string}    articleType - ledger or budget
     * @param  {[Object]}  items - list of items in the article. This is to obtain the categories
     * @return {[columnSetup]}         collection of columns in left-first order
     * @typedef {Object}  columnSetup
     * @property {string} header - column's display name
     * @property {string} prop - the property on the item object
     * @property {string} class - column's css style
     * @property {string} inputType - html input type
     * @property {Function} getOptions - a function to call the latest options
     * NOTE: The collection needs to be updated whenever the payload properties changes
     */
    function getColumnConfig(articleType, items) {
      if(items && items.length > 0) {
        setCategories(items);
      }

      if (articleType === 'ledger') {
        //TODO for ledger
      }
      else {
        return [
          { name: 'Item',      prop: 'description', class: 'col-md-5 text-left',  inputType: 'text'},
          { name: 'Category',  prop: 'category',    class: 'col-md-2 text-left',  inputType: 'select', getOptions: getCategories},
          { name: 'Frequency', prop: 'occurance',   class: 'col-md-2 text-center',inputType: 'select', getOptions: getOccurances},
          { name: 'Amount',    prop: 'amount',      class: 'col-md-1 text-right', inputType: 'number'}
        ];
      }
    }

    function getOccurances() {
      return _.clone(occurances);
    }

    function setCategories(items) {
      categories = categoryFactory.createLabels(items);
    }

    function getCategories() {
      return _.clone(categories);
    }
  }
})();
