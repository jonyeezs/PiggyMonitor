(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('ArticleFactory', articleFactory);

  articleFactory.$inject = ['_', 'occurances', 'categoryFactory'];
  /* @ngInject */
  function articleFactory(_, occurances, categoryFactory) {

    var service = {
      getColumnConfig: getColumnConfig,
      getCategories: getCategories
    };

    return service;

    /**
    * @typedef {Object}  columnSetup
    * @property {string} header - column's display name
    * @property {string} prop - the property on the item object
    * @property {string} class - column's css style
    * @property {string} inputType - html input type
    * @property {Function} options - list of options
     */
    /**
     * creates the header and the columns
     * @method getColumnConfig
     * @param  {string}    articleType - actual or budget
     * @param  {[Object]}  items - list of items in the article. This is to obtain the categories
     * @return {[columnSetup]}         collection of columns in left-first order
     * NOTE: The collection needs to be updated whenever the payload properties changes
     */
    function getColumnConfig(articleType, items) {
      var categories = items && items.length > 0 ? getCategories(items) : [];

      if (articleType === 'actual') {
        return [
          {
            name: 'Date',
            prop: 'date',
            class: 'col-md-2 text-left',
            inputType: 'date'
          },
          {
            name: 'Item',
            prop: 'description',
            class: 'col-md-5 text-left',
            inputType: 'text'
          },
          {
            name: 'Category',
            prop: 'category',
            class: 'col-md-2 text-left',
            inputType: 'select',
            options: categories
          },
          {
            name: 'Amount',
            prop: 'amount',
            class: 'col-md-1 text-right',
            inputType: 'number'
          }
        ];
      }
      else {
        return [
          {
            name: 'Item',
            prop: 'description',
            class: 'col-md-5 text-left',
            inputType: 'text'
          },
          {
            name: 'Category',
            prop: 'category',
            class: 'col-md-2 text-left',
            inputType: 'select',
            options: categories
          },
          {
            name: 'Frequency',
            prop: 'occurance',
            class: 'col-md-2 text-center',
            inputType: 'select',
            options: occurances
          },
          {
            name: 'Amount',
            prop: 'amount',
            class: 'col-md-1 text-right',
            inputType: 'number'
          }
        ];
      }
    }

    function getCategories(items) {
      return categoryFactory.createLabels(items);
    }
  }
})();
