// npm packages
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var api = require('./app/routing/apiRoutes.js');
var html = require('./app/routing/htmlRoutes.js');


// new express app
var app = express();

// middleware
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// your code here...
api.apiRoutes(app);
html.htmlRoutes(app, express, path);



var PORT = process.env.PORT || 3000
// listening port
app.listen(PORT, function (e) {
  if (e) throw e
})
