define([], function() {

  	return {
  		shareButton: function (element, board) {
      var id =  $(element).parent().parent().attr('id')
      console.log(board.boardCells[id].text)
			$(element).click(function(e){
            	e.preventDefault(); 
            	FB.ui({
                  app_id: '736748319669744',
                	method: 'feed',
                  source: board.boardCells[id].audioUrl,
                	name: board.boardCells[id].text,
                	link: window.location.href,
                	picture: "https://s3-eu-west-1.amazonaws.com/epic-board/epic-board.jpg",
                	caption: window.location.href,
                	description: 'Listen to this awesome sound!',
                	message: ''
            	});     
        	});
  		}
  	}
});