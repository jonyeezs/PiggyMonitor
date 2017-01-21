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

As well as plugins you can use on your own html table element

### edi-table

This is the out-of-the-box custom table element. See [Attributes](#Attrubutes) on how what each custom attributes mean.

`edi-table` offers all features (that would be described in the plugins).

```html
<edi-table col-setup="::$ctrl.setup" items="$ctrl.rows" settings="$ctrl.settings" on-item-created="$ctrl.callback(item)" on-item-updated="$ctrl.callback(event, item)"></edi-table>
```

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

1. For bootstrap gril layout users, An empty header column of size `col-md-2` is added at the end for the operation buttons.

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
multable  | allow multiple selection

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
