var mongoose = require('mongoose');

var connection = function(fun) {
	var mongoose = mongoose.connect('mongodb://localhost/my_database')
	fun(mongoose)
	mongoose.disconnect()
}


var doQuery = function(query) {
	connection(function(mongoose) {
		query(mongoose)
		mongoose.close()
	})
}

exports.getMyData = function(email) {
	doQuery(function(mongoose) {
		mongoose.findOne({'*'}, function(data) {
			mongoose.close()
		})
	})
}
