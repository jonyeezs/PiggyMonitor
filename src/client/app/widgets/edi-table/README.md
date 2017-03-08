# Edi-Table

This component creates a **table element** for you base on the settings you provide.

It offers rich features such as:

1. Sorting by targeted column
1. Inline editing
1. Adding new items
1. Multi select
1. Modular plugins to HTML table

## Pre-requisite

1. glyphicons
2. bootstrap grid layout

## How To Use

edi-table offers a out-of-the-box table element you can use.

As well as plugins you can use on your own html table element. See [Attributes](#attributes) for further details on what the element attrs mean.

### edi-table

This is the out-of-the-box custom table element. See [Attributes](#Attrubutes) on how what each custom attributes mean.

`edi-table` offers all features (that would be described in the plugins).

```html
<edi-table col-setup="::$ctrl.setup" items="$ctrl.rows" settings="$ctrl.settings" on-item-created="$ctrl.callback(item)" on-item-updated="$ctrl.callback(event, items)"></edi-table>
```

* `on-item-created` - callback of the new item when created through the `edi-temizer`
* `on-item-updated` - callback of a list of items (if multiple is not selected, list will contain the single item) that were updated; either by deletion or changes in value.

### edi-theader

This allows you to add a dynamic `th` display that has sorting capabilities.

Columns can be sorted one at a time. Each time a header is clicked to be sorted, it will output a callback of the column property and if it is descending or not.

You can then use this information to order your `ngRepeat` rows.

```html
<table>
  <thead>
    <tr>
      <th ng-repeat="colDetail in $ctrl.colSetup" edi-theader col-detail="::colDetail" on-sort="$ctrl.setSort(column, desc)">
      </th>
      <th>
        You can add your own addition th that's not specified in the colSetup
      </th>
    </tr>
  </thead>
</table>
```

### edi-tr

Creates a table row element where columns are base on the [`colSetup`](#col-setup).

`edi-tr` has three features:
1. create dynamic table
2. allow for editing
3. multi-select capabilities

Below is an example of the most minimum required objects for the `edi-tr` attributes

```json
colDetails: [{
  prop: 'title',
  inputType: 'text'
},
{
  prop: 'amount',
  inputType: 'text'  
}]

item: {
  title: 'value',
  amount: '100'
}
```
The item object must have properties corresponding to the colDetails' key-value pair of prop

#### 1. Using as a display only table row

These are the minimum required attributes that is needed for all use case.

```html
<tr ng-repeat="item in items"
  edi-tr
  ng-model="item"
  edi-tr-setup="colDetails">
</tr>
```

#### 2. Enable edit mode

Include these additional attributes

```html
<tr ...
  ng-form
  edi-tr-editable="true"
  edi-tr-on-save="$ctrl.itemUpdated(items)">
</tr>
```

`ng-form` is required to allow `ngModel` to interact with the edit buttons. You may use the controller as you wish.

`edi-tr-on-save` requires an promise callback that will be the method to post your changes.

### edi-td

Component to display data for a column in a row. This component gets utilize by `edi-tr`. So naturally this would extend the edit capabilities.

#### 1. Without edit mode

```html
<td ng-repeat="colDetail in colSetup" ng-class="colDetail.class">
  <edi-td td-data="model" edi-td-setup="::colDetail"></edi-td>
</td>
```

#### 2. Allow edit

```html
<td ng-repeat="colDetail in colSetup" ng-class="colDetail.class">
  <edi-td td-data="model" edi-td-setup="::colDetail" 
    edi-td-edit-mode="true" 
    edi-td-on-edit-changes="modelValueChange(changeObj)" 
    edi-td-disable="false"></edi-td>
</td>
```

* Set `edi-td-edit-mode` to true to show the input fields; false to show in display-only mode.
* Setting `edi-td-disable` to true will disable the input fields.
* `edi-td-on-edit-changes` callback gets fired when a change has been made to the input field.


### edi-temizer

Creates a td form.

To show and hide the form this component is used:
```html
<edi-temizer-button ></edi-temizer-button>
```
To include the form
```html
    <tr edi-temizer
      col-setup="$ctrl.colSetup"
      itemizer-on-complete="$ctrl.itemAdded(item)">
    </tr>
```

`itemizer-on-complete` is a callback binding fired when the form is submitted by clicking the tick button.

## Attributes

Following are explanation on how each attributes work

### col-setup

This setups the columns' identification. An array of identification object is required.
The order of in the array dictates which column position it will take. index 0 being the first and so forth.

Below are details of what an identification object looks like:

Property Name | Description | Mandatory?
-- | -- | --
header | column's display name | yes
prop | the property on the item's object | yes
class | the colum's css style (see [Important Notes](#important-notes) about limitation) | no
inputType | the html input type that will be used when the row gets editable | when settings allow
options | array of options string when input is a `select` or `datalist` | specified inputType

#### Important notes:

1. For bootstrap grid layout users, An empty header column of size `col-md-2` is added at the end for the operation buttons.

_**Caveat**: I don't know how this will perform if the setup is change dynamically. I think it'll break so please do use one-time binding_

### items

list of items to be display on each `<tr>`

The value to be displayed must have its object property matching to the `col-setup`

It is wise to have unique identifiers for each object, as when an item has its state transformed it will send that item back to the client. Quickest way to identifier which of your items need some work is by that unique identifier.

The identifier is for your own consumption. Edi-table doesn't use it at all.

For example:

```javascript
$ctrl.setup = [
    {
      prop: 'foo'
    },
    {
      prop: 'bar'
    }
];

$ctrl.item = [
  {
    _id: 1
    foo: 'to be displayed on foo column',
    bar: 'to be displayed on bar column'
  }
];
```

### settings

This takes in a hash of available boolean settings listed below:

Setting Key | Description
-- | --
editable  | allow for items to be editable
creatable | allow adding of new items
deletable | allow deletion of items
multable  | allow multiple selection. When selections are updated `on-item-updated` returns a list of the selected items.

By default, they are all disabled.

### Events

Events have hooks that are optional to use.
Some hooks happen only when the settings do allow.

on-item-created is only available when `creatable` is `true`.
on-item-updated has two possibilities which will be discussed further.

The events expects the client to return a response to continue updating its table.

While it is waiting for this response, the rows will display some visual hints to the user something is happening in the background.

#### on-item-created

Fires off the callback when a new item is created.

The callback's argument contains the newly created item's object.

If the callback returns a promise, it will resolve by setting removing the add-mode state.

If the call back isn't a promise, the creation event ends the same.

#### on-item-updated

Fires off the callback when a row has values updated.

The callback takes in two arguments:

1. `event` - of two types of string value
  * `updated`: one of the item's object has a value changes
  * `deleted`: the item has been deleted
1. `item` - the item in relation to the event.
  
You should check for your unique identifier on the return object.

If the callback returns a promise, it will resolve by expecting the item in the first argument and add complete the action, ie. remove the item from view or update the view and exit the edit-mode.


## TODO

- [ ] Use contenteditable instead of having extra buttons. Here's an example: https://github.com/akatov/angular-contenteditable
- [X] Extend some functionalities into modular components
- [ ] Allow dynamic table setup
- [ ] Filtering of rows
- [ ] Multiple sorting
- [ ] Use Font-awesome instead
- [ ] Convert items into ngModel
- [ ] Show some error when things failed
- [ ] What unit test?
