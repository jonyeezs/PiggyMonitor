# Lessons

* [out-the-door](#lesson\out-the-door) - getting all the work done quickest and maybe dirtiest

## making use of the event queue to run our

http://javascript.info/settimeout-setinterval#allowing-the-browser-to-render 

http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

## lesson\out-the-door

Not much lessons to be learnt here. Mostly we just using new tools and dirty experiments.

This iteration isn't perfect. In fact it is down right bad practices but it is the quickest code i can write to get work done.

It is laced with TODOs and FIXMEs.

Take this lesson as quick experimentation. Most notably the article-table.

This would be a good case where I can see how well I can refactor the code easily.

### Refactoring article-table

Trying to make a complex table reusable by few cases is quite hard. I wonder if it was actually beneficial. But looking at the amount of code to write out a table generator for say the ledger would take longer.

With this refactoring, the idea would be setting a bunch of config and allowing that to build it for me.

There is still alot of room for improvement:
- Change structure from table to divs so we can utilize the form tag
- Able to differentiate a expense and a income entry
- Perhaps look into the performance with so much watcher-hungry ngAttr

I've learnt that refactoring straight away isn't always smart. As you progress further, you come to realize where it makes more sense to refactor and also realize where time is best spent.


## lesson\edi-table

Learnt so much about this. Using the $compile api. Working with nested directives.

As well figuring out how ngModelController actually works.

Sometimes things don't follow a nice pattern and seems hacky. But if the hack is only for a specific problem and will never affect anyone else. Maybe its ok to do it that way.

Man creating dynamic tables with components is hard. Something that should be simple to use now looks so complicated to jump through hoops!

## cleanup

It's time to move to webpack. Although bower seems to be maintain they seem to highly recommend to use webpack. As it stands webpack is progressing towards using modules rather than including javascript to html.

It's time to stop using bower and start using a more modern approach.

There's alot of work that needs to be done here. Here's the order of work that needs to be done:

1. Remove dependency on bower. Move all bower files into npm package.json.
2. Remove steps that adds bower files to index.html and as well any static js or css files.
  1. Remove bower boilerplates
3. Migrate all files to use commonJS.
  1. [Remove IIFE](https://codepen.io/martinmcwhorter/post/angularjs-1-x-with-typescript-or-es6-best-practices#dont-use-iife-immediatly-invoked-function-expression-2)
  2. Rename .module.js to index.js
4. Prepare for [Webpack](https://webpack.js.org/guides/get-started/)
  1. `npm install -g webpack` and create `webpack.config.js`
  2. import templates by code using html loader
  3. use css loaders to bundle styling
5. Generate landing page
6. Create dev build environment
7. Configure karma to use Webpack. This is to complete single run mode.
  1. install the required loaders and delete unused
  2. for each test require the file for testing
  3. create a bard extension to inject in the core providers. (_TODO could make the modules more modular so we don't have to do this_)
  4. add command to run in debug mode
