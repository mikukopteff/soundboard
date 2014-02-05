define([], function() {

  	return {
  		shareButton: function (element, board) {
      var id =  $(element).parent().parent().attr('id')
      var shareDialog = $(element).parent().parent().children('.share-dialog')
      var shareUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1) + id

			$(shareDialog).children('input').attr('value', shareUrl)
      
      $(element).click(function(e){
        e.preventDefault() 
        $(shareDialog).toggle(1000)
        $(shareDialog).children('input').select()
      });

      $(shareDialog).children('a.share-item').click(function(e){
            	e.preventDefault() 
            	FB.ui({
                  app_id: '736748319669744',
                	method: 'feed',
                	name: 'Epic Board sound: ' + board.boardCells[id].text,
                	link: shareUrl,
                	picture: "https://s3-eu-west-1.amazonaws.com/epic-board/epic-board.jpg",
                	caption: window.location.href,
                	description: 'Listen to a sound on Epic Soundboard',
                	message: ''
            	});
              $(shareDialog).hide(1000)     
        	});
  		},
      highlightSelected: function (soundId){
        if (soundId != '') {
          var selected = $('#' + (parseInt(soundId)))
          selected.addClass('sound-selected')
          $('html, body').animate({ scrollTop: selected.offset().top }, 'slow')
        }
      }
  	}
});
