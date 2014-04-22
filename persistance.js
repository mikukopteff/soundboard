var mongoose = require('mongoose')
var Schema = mongoose.Schema

var boardSchema = mongoose.Schema({
	boardId: Number,
	author: String,
	boardCells: [Schema.Types.Mixed]
})

var Boards = mongoose.model('Boards', boardSchema)

var inConnection = function(fun) {
	mongoose.connect('mongodb://localhost/epic')
	fun(mongoose.connection)
}

exports.getMyData = function(email) {
	inConnection(function(connection) {
		Boards.findOne('' , function(err, data) {
			console.log(data)
			connection.close()
		})
	})
}
