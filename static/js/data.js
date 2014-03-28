define([], function() {
	var classOrder = ['blue', 'green', 'orange', 'red', 'orange', 'red', 'blue', 'green'];

  	return {
  		boardConstructor: function (buttonClicked, boardCreated) {
			$.ajax('/static/default-board.json').done(function(json) {				
				console.log(json);
				for (var i = 0; i < json.boardCells.length; i++) {
					var newCell = $("#cell").clone();
					newCell.attr('id', i);
					newCell.addClass('cell')
					var y = classOrder.length > i ? i : i - classOrder.length;
					newCell.addClass(classOrder[y])
					newCell.children('a.buttontext').text(json.boardCells[i].text)
						.attr('href','#').click(buttonClicked);
					newCell.children('audio').children('source').attr('src', json.boardCells[i].audioUrl)
					newCell.appendTo(".board").show();
				}
				boardCreated(json);
			});  			
  		}
  	}
});