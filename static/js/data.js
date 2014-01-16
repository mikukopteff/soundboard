define([], function() {
	var classOrder = ['blue', 'green', 'orange', 'red', 'orange', 'red', 'blue', 'green'];

  	return {
  		getBoardData: function (callback) {
			$.ajax('/default-board.json').done(function(json) {				
				console.log(json);
				for (var i = 0; i < json.boardCells.length; i++) {
					var newCell = $("#cell").clone();
					newCell.removeAttr('id');
					var y = classOrder.length > i ? i : i - classOrder.length;
					newCell.addClass(classOrder[y]) 
					newCell.children('a').text(json.boardCells[i].text)
						.attr('href','#').attr('data-audio-url', json.boardCells[i].audioUrl)
						.click(callback);
					newCell.appendTo(".board").show();	
				}
			});  			
  		}
  	}
});