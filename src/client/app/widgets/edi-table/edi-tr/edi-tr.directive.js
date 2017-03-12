(function () {
  'use strict';

  angular
    .module('app.edi-table')
    .directive('ediTr', editr);

  editr.$inject = ['$q', 'EdiTrMultiSelection'];

  function editr($q, EdiTrMultiSelection) {
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

      var disposeMultiSelectListener = null;
      var _previousModelValue = undefined;
      var ediTableId = ele.closest('edi-table').attr('id');

      //ngModel
      api.model.$render =  function viewToTdData() {
        var value = api.model.$modelValue || api.model.$viewValue;

        scope.model = Object.assign({}, value);

        //register in the render so that the model id can be obtained
        //register multi-selector only if the edi-table was given an id
        if(attr.ediTrMultiSelector && disposeMultiSelectListener == null && ediTableId) {
          disposeMultiSelectListener = EdiTrMultiSelection.register({
            set model(changeObj) {
              scope.model = Object.assign({}, api.model.$modelValue || api.model.$viewValue, changeObj);
              api.model.$setViewValue(scope.model);
            },
            get model() {
              return api.model.$modelValue;
            },
            set previousModel(model) {
              _previousModelValue = Object.assign({}, model);
            },
            get previousModel() {
              return _previousModelValue;
            }
          },
          rollBackNgModelAndResetEditState,
          function updateEdiTrState(isInProgress, isSaving, isMultiSelect) {
            if (isInProgress != null) scope._editState.inProgress = isInProgress;
            if (isSaving != null) scope._editState.saving = isSaving;
            if (isMultiSelect != null) scope._editState.multiSelected = isMultiSelect;
          },
          scope.model.id, ediTableId);
        }
      };

      if (scope.editable)
      {
        resetEditState(scope);

        api.model.$validators.required = function (modelValue, viewValue) {
          //No validation needs to be done when it is first rendered from the collection. (this may change)
          if (api.model.$$currentValidationRunId <= 1) return true;

          return scope.colSetup.every(function(col) { return api.form[col.prop].$error.required == null; });
        }
      }

      //callback to obtain changes in the tds
      scope.modelValueChange = function (changeObj) {
        //clones into a new object to overcome the strict equality on $render, with persisting any properties needed by angular
        var data = Object.assign({}, api.model.$modelValue || api.model.$viewValue, changeObj);
        if(EdiTrMultiSelection.hasMultiSelected(ediTableId)) {
          EdiTrMultiSelection.updateProperty(ediTableId, data.id, changeObj);
        }
        api.model.$setViewValue(data);
      }

      // Buttons
      if (api.form) {
        scope.edit = function (evt, selectedItem) {
          evt.stopPropagation();

          if (!scope.editable) return;

          _previousModelValue = api.model.$modelValue;

          if(EdiTrMultiSelection.hasMultiSelected(ediTableId)) {
            EdiTrMultiSelection.prepareForEdit(ediTableId, scope.model.id);
          }

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

          if(EdiTrMultiSelection.hasMultiSelected(ediTableId)) {
            EdiTrMultiSelection.rollbackAll(scope.model.id, ediTableId);
          }

          rollBackNgModelAndResetEditState();
        };
      }

      scope.$on('$destroy', function () {
        if (disposeMultiSelectListener != null) { disposeMultiSelectListener(); }
      });

      function updateToServer(value) {
        scope._editState.saving = true;

        //TODO this isn't working yet to set the loading state
        var items = EdiTrMultiSelection.hasMultiSelected(ediTableId) ? EdiTrMultiSelection.getSelectedItems(ediTableId, true) : [value];

        return scope.saveCallback({ items: items })
          .then(function () {
            api.form.$setPristine();
            scope._editState.saving = false;
            scope._editState.inProgress = false;
            EdiTrMultiSelection.completeForEdit(ediTableId);
          }, function () {
            scope._editState.saving = false;
          });
      };

      function rollBackNgModelAndResetEditState() {
        scope.model = Object.assign({}, _previousModelValue);
        api.form.$setPristine();
        resetEditState(scope);
      }

      function resetEditState(scope) {
        scope._editState = {
          inProgress: false,
          saving: false,
          multiSelected: false
        };
      }
    }
  }
})();
