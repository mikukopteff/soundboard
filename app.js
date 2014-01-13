var express = require('express');
var app = express();

var oneDay = 86400000;

app.use(express.compress());

app.use(express.static(__dirname + '/static', { maxAge: oneDay }));

app.listen(process.env.PORT || 8000);