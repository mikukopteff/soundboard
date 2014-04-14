var express = require('express')
var _ = require('underscore')
var cons = require('consolidate')
var auth = require('./auth.js')
var app = express()
var amd = require("amd-loader")
var validate = require('./static/js/helpers/validate.js')
var AuthCookie = 'epicboardauth'

app.configure(function() {
	app.use(express.compress())
  	app.use(express.cookieParser('fooobarzzzz'))
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

app.get('/check/email/:email', function(req, res) {
	if (_.contains(emails, req.params.email))
		res.send('true')
	else
		res.send('false')
})

app.all('/auth/*', function(req, res, next) {
	console.log('Authenticating user')
	if (!auth.validateToken(req.signedCookies.epicboardauth))
		res.status(400).send('Not authenticated. Wooops!')
	else
		next()
})

app.get('/auth/myboard', function(req, res) {
	res.send({
		boardId: "1",
		author: "miku",
		boardCells: [{text: "Sound!", audioUrl: "https://s3-eu-west-1.amazonaws.com/epic-board/varmaa3.wav"}
		]
	})	
})

app.post('/register', function(req, res) {
	console.log(req.body.email)
	console.log(req.body.password)
	validate.email(req.body.email, function() {
		res.status(400).send('Email not valid')
	}, function() {
		console.log('Email is valid')
	})
	validate.password(req.body.password, function() {
		res.status(400).send('Password too short')
	}, function() {
		console.log('All validated, registering user')
		emails.push(req.body.email)
		res.cookie(AuthCookie, auth.createToken(req.body.email), {signed: true})
		res.send('successful')
	})
})

app.post('/login', function(req, res) {
	res.cookie(AuthCookie, auth.createToken(req.body.email), {signed: true})
	res.send('successful')
})
