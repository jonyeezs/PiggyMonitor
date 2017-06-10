# piggyMonitor

## Lessons

As this project is moreso for my learning experience.

I've noted down the lessons I've learnt in another md file: LESSONS.md

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

## Exploring piggyMonitor

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

## Running piggyMonitor

### Task Listing

#### Build

- `npm start`

NODE_ENV - 'production' or 'dev'

#### Test

- `npm test` runs test on console
- `npm test -- --debug` runs it on debug mode with auto-watch enabled

## License

MIT
