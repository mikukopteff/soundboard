var express = require('express');
var app = express();

app.use(express.compress());

app.use('/', express.static(__dirname + '/static'));
app.use('/test', express.static(__dirname + '/test'))
app.use('/test/lib/mocha', express.static(__dirname + '/node_modules/mocha'))
app.use('/test/lib/chai', express.static(__dirname + '/node_modules/chai'))
app.use('/test/lib/js-fixtures', express.static(__dirname + '/node_modules/js-fixtures'))
//app.use('/test/chai-jquery', express.static('node_modules/chai-jquery'))

app.listen(process.env.PORT || 8000);