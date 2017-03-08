(function () {
  'use strict';

  angular
    .module('app.edi-table')
    .directive('ediTr', editr);

  editr.$inject = ['$q'];

  function editr($q) {
    var directive = {
      templateUrl: 'app/widgets/edi-table/edi-tr/edi-tr.html',
      restrict: 'A',
      scope: {
        colSetup: '<ediTrSetup',
        editable: '<?ediTrEditable',
        saveCallback: '&?ediTrOnSave'
      },
      require: {
        form: '?form',
        model: 'ngModel'
      },
      link: linkTr
    };
    return directive;

    function linkTr(scope, ele, attr, api) {
      //ngModel
      api.model.$render =  function viewToTdData() {
        var value = api.model.$modelValue || api.model.$viewValue;

        scope.model = Object.assign({}, value);
      };

      if (scope.editable)
      {
        var _previousModelValue = undefined;

        setEditState(scope);

        api.model.$validators.required = function (modelValue, viewValue) {
          //No validation needs to be done when it is first rendered from the collection. (this may change)
          if (api.model.$$currentValidationRunId <= 1) return true;

          return scope.colSetup.every(function(col) { return api.form[col.prop].$error.required == null; });
        }
      }

      //scope ngModel accessor for controller
      scope.modelValueChange = function (changeObj) {
        //clones into a new object to overcome the strict equality on $render, with persisting any properties needed by angular
        var data = Object.assign({}, api.model.$modelValue || api.model.$viewValue, changeObj);
        api.model.$setViewValue(data);
      }

      // Buttons
      if (api.form) {
        scope.edit = function (evt, selectedItem) {
          evt.stopPropagation();

          if (!scope.editable) return;

          _previousModelValue = api.model.$modelValue;

          scope._editState.inProgress = true;
          scope._editState.saving = false;
        };

        scope.save = function (evt, selectedItem) {
          evt.stopPropagation();

          if (!scope.editable) return;

          if (api.form.$pristine || api.form.$invalid) return;

          updateToServer(api.model.$modelValue);
        };

        scope.cancel = function (evt) {
          evt.stopPropagation();

          if (!scope.editable) return;

          rollBackNgModel();

          scope._editState.inProgress = false;
          scope._editState.saving = false;
        };
      }

      function updateToServer(value) {
        scope._editState.saving = true;

        return scope.saveCallback({ items: [value] })
          .then(function () {
            api.form.$setPristine();
            scope._editState.saving = false;
            scope._editState.inProgress = false;
          }, function () {
            scope._editState.saving = false;
          });
      };

      function rollBackNgModel() {
        scope.model = Object.assign({}, _previousModelValue);
        api.form.$setPristine();
      }

      function setEditState(scope) {
        scope._editState = {
          inProgress: false,
          saving: false
        }
      }
    }
  }
})();
