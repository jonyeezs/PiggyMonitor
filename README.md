# piggyMonitor

**Generated from HotTowel Angular**

>*Opinionated Angular style guide for teams by [@john_papa](//twitter.com/john_papa)*

>More details about the styles and patterns used in this app can be found in my [Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide) and my [Angular Patterns: Clean Code](http://jpapa.me/ngclean) course at [Pluralsight](http://pluralsight.com/training/Authors/Details/john-papa) and working in teams.

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install Yeoman `npm install -g yo`

3. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

***

## Exploring piggyMonitor
piggyMonitor Angular starter project

### Structure
The structure also contains a gulpfile.js and a server folder.

The server is there just so we can serve the app using node [expressjs](http://expressjs.com/).

    /src
        /client
            /app
            /spec
        /server
            app.js


#### Test Stack
Framework and libaries setup in _karma.conf.js::frameworks_

- Using [Karma](k) as the test runner.
- The specs is build on [Mocha](m) test framework.
- Using [Sinon](s) for test doubles
- and lastly, [Chai](c) assertions (including Sinon-chai).

[k]: https://karma-runner.github.io/0.13/index.html
[m]: https://mochajs.org/
[c]: `https://gist.github.com/yoavniran/1e3b0162e1545055429e`
[s]: http://sinonjs.org/docs/

### Installing Packages

To install packages for gulp via [npm](https://docs.npmjs.com/getting-started/using-a-package.json). Packages from package.json
 - `npm install`

To install packages for the app via . Packages from bower.json
 - `bower install`

***

## Running piggyMonitor with Gulp

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Parameters for tasks

Available [yargs](yargs) variables

 * **--verbose**     : Various tasks will produce more output to the console.
 * **--nosync**      : Don't automatically launch the browser with browser-sync.
 * **--debug**       : Launch debugger with node-inspector.
 * **--debug-brk**   : Launch debugger and break on 1st line with node-inspector.
 * **--startServers**: Will start servers for midway tests on the test task.    

[yargs]:https://github.com/yargs/yargs)

### Build app and specs base file

The index.html and specs.html, are generated via gulp using a boilerplate.

The boilerplates can be found in the boilerplate folder.

- `gulp inject`

    Builds the index.html

- `gulp build-specs`

    Builds the specs.html

### Development

- `gulp dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

### Production

- `gulp build-app`

    Copies all fonts, copies images and runs `gulp optimize-build` to build the production code to the build folder.

- `gulp build`

    Serve the optimized code from the build folder and launch it in a browser.

### Testing

- `gulp specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp autotest`

    Runs a watch to run all unit tests.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.
    _(TODO use eslint)_

    --verbose to display all files affected and extended info.

- `gulp plato`

    Performs code analysis using [plato][plato] on all javascript files. Plato generates a report in the reports folder.

[plato]: https://github.com/es-analysis/plato

### Cleaning Up Build and Temp folder

- `gulp clean`

### Bumping Versions

- `gulp bump`

    Bump the minor version using semver.
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --ver=1.2.3 // specific version

## License

MIT
