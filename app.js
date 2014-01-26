var express = require('express')
var _ = require('underscore')
cons = require('consolidate')

var app = express()
app.use(express.compress())

app.use('/', express.static(__dirname + '/static'))
app.use('/test', express.static(__dirname + '/test'))
app.use('/test/lib/mocha', express.static(__dirname + '/node_modules/mocha'))
app.use('/test/lib/chai', express.static(__dirname + '/node_modules/chai'))
app.use('/test/lib/js-fixtures', express.static(__dirname + '/node_modules/js-fixtures'))
app.use('/test/chai-jquery', express.static('node_modules/chai-jquery'))

app.engine('html', cons.underscore)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

console.log('Server started')
app.listen(process.env.PORT || 8000)

app.get('/app', function(req, res){
	res.render('index', {title : 'The most Epic of Soundboards', 
		url: req.protocol + "://" + req.get('host') + req.url,
		description: 'Awesome Soundboard app'})
})




