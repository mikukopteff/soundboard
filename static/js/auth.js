define(['../js/helpers/validate', '../js/helpers/util'], function(validate, util) {

	var authDone = function(){console.log('initializing still')}

	function checkEmailExistance(inputEvent) {
		var string = $(inputEvent.currentTarget).val()
		if (string.length == 0)
			return
		jQuery.ajax({
        	url:    '/check/email/' + string,
        	success: function(result) {
				if(result != 'true')
					register()
				else
					login()
            },
         	async: false
    	});     
	}

	function matchPasswords(inputEvent) {
		var passTwo = $(inputEvent.currentTarget.children[0]).val()
		if (passTwo == $('#auth-pass').val()) {
			if ($('#auth-button').prop('disabled')) {
				enableButton()
				registerButtonHandler('register')
			}
			$('#pass-text').hide()
		} else {
			$('#pass-text').text('Passwords don\'t match').show()
		}
	}

	function checkPasswordLength(inputEvent) {
		var password = $(inputEvent.currentTarget).val()
		var errorFunc = util.partial(showErrorField, 'length-error', 'Password is too short, could you make it a bit longer?')
		var successFunc = util.partial(deleteErrorField, 'length-error')
		validate.password(password, errorFunc, successFunc)
	}

	function checkEmailValidity(inputEvent) {
		validate.email($(inputEvent.currentTarget).val(),
			util.partial(showErrorField, 'email-error', 'Not a valid email yet'),
			util.partial(deleteErrorField, 'email-error'))
	}

	function createSecondPasswordField() {
		if ($('#confirmpass').length == 0) {
			var secondPass = $('#password').clone()
			secondPass.attr('id', 'confirmpass')
			$(secondPass.children()[0]).attr('placeholder', 're-enter password')
			$(secondPass.children()[0]).attr('id', 'auth-pass-2')
			$(secondPass.children()[0]).attr('name', 'confirmpass')
			secondPass.insertAfter($('#password'))
		}
	}

	function register() {
		$('#auth-text').hide().text('Email not found, please register first!').fadeIn(500)
		createSecondPasswordField()
		$('#auth-button').attr('value', 'Register')
		$('#confirmpass').keyup(matchPasswords)
		$('#auth-pass').keyup(checkPasswordLength)
	}

	function login() {
		$('#auth-button').attr('value', 'Login')
		enableButton()
		registerButtonHandler('login')
	}

	function showErrorField(id, errorText) {
		if ($('#' + id).length == 0)
			$('#pass-text').clone().attr('id', id).text(errorText).insertAfter('#pass-text').show()
	}

	function deleteErrorField(id) {
		$('#' + id).remove()
	}

	function disableButton() {
		$('#auth-button').prop("disabled", true)
	}

	function enableButton() {
		$('#auth-button').addClass('button-enabled')
		$('#auth-button').removeAttr("disabled")
	}

	return {
		registerEventHandlers: function(done) {
			authDone = done
			disableButton()	
			$('#auth-email').keyup(checkEmailValidity)
			$('#auth-email').change(checkEmailExistance)
		}
	}

	function registerButtonHandler(type) {
		$('#auth-button').click(function(e) {
        	e.preventDefault()
        	$.post('/' + type, $('#auth').serialize()).done(function(data) {
           		if (data == 'successful') {
            		authDone(data)
        		} else {
        			console.log(data)
        			showErrorField('Something went horribly wrong. Please refresh the page.')
        		}
           		
        	});
    	})
	}
})