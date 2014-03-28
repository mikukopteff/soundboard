 /* Use Puronen's authentication token method. All hail Puronen!
    user.userId|expiration|HMAC(user.userId|expiration,key)
 */

var crypto = require('crypto')
var CipherPassword = 'vNYamdOlq9OLf+OVEVzeZO0WGL29LEL+5KN/aA5hN/A='
var Key = 'iemFHj9q47DDDJTtHrqAXB96Z/UdlGYR9Z+KxpI0OO4='
var OutputEncoding = 'base64'
var InputEncoding = 'utf8'
var EncryptionAlgo = 'aes128'

var Expiration = 60 * 60 * 24 * 7 * 1000
var Sep = '|'

function digest(string) {
	var digester = crypto.createHmac('sha1', 's994Mf54PEgXwgx/2f+Kt5Nbkq6HhgQCYsNDhtvbfC8=')
	return digester.update(string).digest(InputEncoding)	
}

function cipher(string) {
	var aesCipher = crypto.createCipher(EncryptionAlgo, CipherPassword)
	var encryptedFirst =  aesCipher.update(string, InputEncoding, OutputEncoding)
	return encryptedFirst + aesCipher.final(OutputEncoding)
}

function decipher(string) {
	var aesDecipher = crypto.createDecipher(EncryptionAlgo, CipherPassword)
	var decryptedFirst = aesDecipher.update(string, OutputEncoding, InputEncoding)
	return decryptedFirst + aesDecipher.final(InputEncoding)
}

exports.createToken = function(userId) {
	var clearToken = userId + Sep + (new Date().getTime() + Expiration)
	var hmac = digest(clearToken + Key)
	return cipher(clearToken + Sep + hmac)
}

exports.validateToken = function(token) {
	var decryptedToken = decipher(token)
	var tokens =  decryptedToken.split(Sep)
	var originalHmac  = decryptedToken.substring(decryptedToken.split(Sep, 2).join(Sep).length + 1)
	var newHmac = digest((tokens[0] + Sep + tokens[1] + Key))
	if (newHmac == originalHmac && tokens[1] > new Date().getTime()) {
		return tokens[0]
	} else {
		return false
	}
}
