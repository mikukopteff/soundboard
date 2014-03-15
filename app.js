var express = require('express')
var _ = require('underscore')
var cons = require('consolidate')
var app = express()

app.configure(function() {
	app.use(express.compress())
  	app.use(express.cookieParser())
  	app.use(express.bodyParser())
  	app.use('/static', express.static(__dirname + '/static'))
	/* Test deps, these should be refactored into a seperate node entrypoint */
	app.use('/test', express.static(__dirname + '/test'))
	app.use('/test/lib/mocha', express.static(__dirname + '/node_modules/mocha'))
	app.use('/test/lib/chai', express.static(__dirname + '/node_modules/chai'))
	app.use('/test/lib/js-fixtures', express.static(__dirname + '/node_modules/js-fixtures'))
	app.use('/test/chai-jquery', express.static('node_modules/chai-jquery'))
})

app.engine('html', cons.underscore)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

console.log('Server started')
app.listen(process.env.PORT || 8000)

var emails = new Array()

function defaultRender(req, res) {
	res.render('index', {title : 'The most Epic of Boards', 
		url: req.protocol + "://" + req.get('host') + req.url,
		description: 'Awesome Soundboard app'})
}

app.get('/', defaultRender)

app.get('/foo/:bar', function(req, res) {
	res.send('foo');
})

app.get('/check/email/:email', function(req, res) {
	if (_.contains(emails, req.params.email))
		res.send('true')
	else
		res.send('false')
})

app.post('/register', function(req, res) {
	console.log(req.body.email)
	console.log(req.body.password)
	emails.push(req.body.email)
	res.send('registered')
})

app.post('/login', function(req, res) {
	res.send('logged in')
})

app.get('/:board/:sound', defaultRender)
