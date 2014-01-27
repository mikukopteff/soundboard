define([], function() {

  	return {
  		shareButton: function (element) {
			console.log('share called')
      var href =  $(element).parent().children('a')
      console.log(href.children('img'))
			href.children('img').click(function(e){
            	e.preventDefault(); 
            	FB.ui({
                  app_id: '736748319669744',
                	method: 'feed',
                  source: href.attr('data-audio-url'),
                	name: href.text(),
                	link: window.location.pathname,
                	picture: "https://s3-eu-west-1.amazonaws.com/epic-board/epic-board.jpg",
                	caption: window.location.href,
                	description: 'Listen to this awesome sound!',
                	message: ''
            	});     
        	});
  		}
  	}
});