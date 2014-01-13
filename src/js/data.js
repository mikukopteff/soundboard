define([], function() {
	var order = ['blue', 'green', 'orange', 'red', 'orange', 'red', 'green'];
	var classOrder = order.concat(['blue']).concat(order.reverse()); 

  	return {
  		getBoardData: function (callback) {
			$.ajax('default-board.json').done(function(json) {				
				console.log(json);
				for (var i = 0; i < json.boardCells.length; i++) {
					var newCell = $("#cell").clone();
					newCell.removeAttr('id');
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