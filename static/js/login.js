define([], function() {

	function checkEmail(inputEvent) {
		var string = $(inputEvent.currentTarget).val()
		console.log(string)
		if (string.length == 0)
			return
		jQuery.ajax({
        	url:    '/check/email/' + $(inputEvent.currentTarget).val(),
        	success: function(result) {
				console.log(result)
				if(result != "true")
					register()
				else
					login()
            },
         	async: false
    	});     
	}

	function matchPasswords(inputEvent) {
		var passTwo = $(inputEvent.currentTarget.children[0]).val()
		if (passTwo == $('#login-pass').val()) {
			$('#login-button').removeProp("disabled")
			$('#pass-text').hide()
		} else {
			$('#pass-text').text('Passwords don\'t match').show()
		}
	}

	function checkPasswordLength(inputEvent) {
		var pass = $(inputEvent.currentTarget).val()
		console.log($(inputEvent.currentTarget).val().length)
		if (pass.length < 8 ) {
			if ($('#length-error').length == 0)
				$('#pass-text').clone().attr('id', 'length-error').text('Password too short! 8 characters please!').insertAfter('#pass-text').show()
		} else {
			$('#length-error').remove()
		}
	}

	function createSecondPasswordField() {
		if ($('#confirmpass').length == 0) {
			var secondPass = $('#password').clone()
			secondPass.attr('id', 'confirmpass')
			$(secondPass.children()[0]).attr('placeholder', 're-enter password')
			$(secondPass.children()[0]).attr('id', 'login-pass-2')
			secondPass.insertAfter($('#password'))
		}
	}

	function register() {
		$('#login-text').hide(500).text('Email not found, please register first!').show(500)
		createSecondPasswordField()
		$('#login-button').attr('value', 'Register')
		$('#confirmpass').keyup(matchPasswords)
		$('#login-pass').keyup(checkPasswordLength)
	}

	return {
		validate: function() {
			$('#login-button').prop("disabled", true)
			$('#login-email').change(checkEmail)
		}
	}
})