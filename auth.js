 /* Use Puronen's authentication token method. All hail Puronen!
    user.userId|expiration|HMAC(user.userId|expiration,key)
 */

var crypto = require('crypto')
var CipherPassword = 'vNYamdOlq9OLf+OVEVzeZO0WGL29LEL+5KN/aA5hN/A='
var Key = 'iemFHj9q47DDDJTtHrqAXB96Z/UdlGYR9Z+KxpI0OO4='

var Expiration = 604800000 //week
var Sep = '|'

function digest(string) {
	var digester = crypto.createHmac('sha1', 's994Mf54PEgXwgx/2f+Kt5Nbkq6HhgQCYsNDhtvbfC8=')
	return digester.update(string).digest('utf8')	
}

function cipher(string) {
	var aesCipher = crypto.createCipher("aes128", CipherPassword)
	var encryptedFirst =  aesCipher.update(string, 'utf8', 'base64')
	return encryptedFirst + aesCipher.final('base64')
}

function decipher(string) {
	var aesDecipher = crypto.createDecipher("aes128", CipherPassword)
	var decryptedFirst = aesDecipher.update(string, 'base64', 'utf8')
	return decryptedFirst + aesDecipher.final('utf8')
}

exports.createToken = function(userId) {
	var clearToken = userId + Sep + (new Date().getTime() + Expiration)
	var hmac = digest(clearToken + Key)
	return cipher(clearToken + Sep + hmac)
}

exports.validateToken = function(token) {
	var decryptedToken = decipher(token)
	var tokens =  decryptedToken.split('|')
	var originalHmac  = decryptedToken.substring(decryptedToken.split('|', 2).join('|').length + 1)
	var newHmac = digest((tokens[0] + Sep + tokens[1] + Key))
	if (newHmac == originalHmac && tokens[1] > new Date().getTime()) {
		return tokens[0]
	} else {
		return false
	}
}
