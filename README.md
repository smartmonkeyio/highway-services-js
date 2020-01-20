[![Build Status](https://travis-ci.org/smartmonkeyio/smartmonkey-services-js.svg?branch=master)](https://travis-ci.org/smartmonkeyio/smartmonkey-services-js)
[![codecov/](https://codecov.io/gh/smartmonkeyio/smartmonkey-services-js/branch/master/graph/badge.svg)](https://codecov.io/gh/smartmonkeyio/smartmonkey-services-js)

# Installation

You can add the library using npm or yarn:

```bash
npm install highway-services --save
```

or:

```bash
yarn add highway-services
```

# Quickstart

To use SmartMonkey services you need to create a User and an API Key in our site: https://highway.smartmonkey.io

Now you can user the services by just using:

```js
const { createHighway } = require("highway-services");
const highway = createHighway(YOUR_API_KEY);
```

# Running tests

To run test you'll need to declare an environment variable `HIGHWAY_PRIVATE_KEY` with a working key created in our webpage (You can just move `.env-example` to `.env`). Then just run the tests with:

```bash
npm run test
```
