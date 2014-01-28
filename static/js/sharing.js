define([], function() {

  	return {
  		shareButton: function (element, board) {
      var id =  $(element).parent().parent().attr('id')
			$(element).click(function(e){
            	e.preventDefault() 
            	FB.ui({
                  app_id: '736748319669744',
                	method: 'feed',
                  //source: board.boardCells[id].audioUrl,
                	name: 'Epic Board sound: ' + board.boardCells[id].text,
                	link: window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1) + id,
                	picture: "https://s3-eu-west-1.amazonaws.com/epic-board/epic-board.jpg",
                	caption: window.location.href,
                	description: 'Listen to a sound on Epic Soundboard',
                	message: ''
            	});     
        	});
  		},
      highlightSelected: function (soundId){
        var selected = $('#' + (parseInt(soundId) - 1))
        selected.addClass('sound-selected')
        $('html, body').animate({ scrollTop: selected.offset().top }, 'slow')
      }
  	}
});
