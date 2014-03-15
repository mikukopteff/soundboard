define([], function() {

	function checkEmailExistance(inputEvent) {
		var string = $(inputEvent.currentTarget).val()
		console.log(string)
		if (string.length == 0)
			return
		jQuery.ajax({
        	url:    '/check/email/' + string,
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
			enableButton()
			$('#pass-text').hide()
		} else {
			$('#pass-text').text('Passwords don\'t match').show()
		}
	}

	function checkPasswordLength(inputEvent) {
		var pass = $(inputEvent.currentTarget).val()
		console.log($(inputEvent.currentTarget).val().length)
		if (pass.length < 8 ) {
			showErrorField('length-error', 'Password is too short, could you make it a bit longer?')
		} else {
			deleteErrorField('length-error')
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

	function checkEmailValidity(inputEvent) {
		if (!validateEmail($(inputEvent.currentTarget).val())) {
			showErrorField('email-error', 'Not a valid email yet')
		} else {
			deleteErrorField('email-error')
		}
	}

	function showErrorField(id, errorText) {
		if ($('#' + id).length == 0)
			$('#pass-text').clone().attr('id', id).text(errorText).insertAfter('#pass-text').show()
	}

	function deleteErrorField(id) {
		$('#' + id).remove()
	}

	function validateEmail(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   		return re.test(email)
	}

	function disableButton() {
		$('#login-button').prop("disabled", true)
	}

	function enableButton() {
		$('#login-button').addClass('button-enabled')
		$('#login-button').removeAttr("disabled")	
	}

	return {
		validate: function() {
			disableButton()	
			$('#login-email').keyup(checkEmailValidity)
			$('#login-email').change(checkEmailExistance)
		}
	}
})