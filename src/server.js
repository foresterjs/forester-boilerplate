"use strict";

// libraries
const path = require('path');
const Forester = require('forester');
const foresterExplorer = require("forester-explorer");
const foresterAuth = require("forester-auth");
const samplePlugin = require("../src/sample-plugin.js");

//project items
const collections = [
  require('../structure/articles.json')
];
const dataSources = [
  require('../config/db1.json')
];
const mappings = require('../structure/mappings.json');
const authConfig = require('../config/auth.json');

//init forester
var app = new Forester();

//add plugins
app.use(foresterExplorer());
app.use(foresterAuth(authConfig));
app.use(samplePlugin());

//register project items
app.registerCollections(collections);
app.registerDataSources(dataSources);
app.registerMappings(mappings);

//register project public folder
app.registerStaticRoute({route: '/', failback: "index.html", path: path.join(__dirname, '../public')});

//boot
app.boot()
  .then(function () {
    app.listen({port: process.env.APP_PORT || 3000});
  })
  .catch(function (e) {
    console.log(e.stack);
  });
