# Lessons

* [out-the-door](#lesson\out-the-door) - getting all the work done quickest and maybe dirtiest

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
