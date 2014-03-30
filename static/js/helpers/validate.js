define([], function() {
	return {
		password: function(password, errorFunc, successFunc) {
			check(errorFunc, successFunc, function() { 
				return password.length < 8 
			})
			
		},
		email: function(email, errorFunc, successFunc) {
			check(errorFunc, successFunc, function() { 
				return !validateEmail(email)
			})
		}
	}

	function validateEmail(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   		return re.test(email)
	}

	function check(errorFunc, successFunc, testFunc) {
		if (testFunc()) {
			errorFunc()
		} else {
			successFunc()
		}
	}
})