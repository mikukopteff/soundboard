define([], function() {
	var order = ['one', 'two', 'three', 'four', 'three', 'four', 'two'];
	var classOrder = order.concat(['one']).concat(order.reverse()); 
  	return {
  		getBoardData: function (callback) {
			$.ajax('default-board.json').done(function(json) {				
				console.log(json);
				for (var i = 0; i < json.boardCells.length; i++) {
					console.log('foo' + i)
					var newCell = $("#cell").clone();
					newCell.addClass(classOrder[i]);
					newCell.children('a').text(json.boardCells[i].text)
						.attr('href','#').attr('data-audio-url', 'test.wav')
						.click(callback);
					newCell.appendTo(".board").show();	
				}
			});  			
  		}
  	}
});