define([], function() {
	return {
		partial: function(func) {
 			var args = Array.prototype.slice.call(arguments, 1)
  			return function() {
    			var allArguments = args.concat(Array.prototype.slice.call(arguments))
    			return func.apply(this, allArguments)
  			}
		}
	}
})