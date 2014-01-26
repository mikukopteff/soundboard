define([], function() {

  	return {
  		shareButton: function (element) {
			console.log('share called')
			$('.share').click(function(e){
            	e.preventDefault(); 
            	FB.ui({
                	method: 'feed',
                	name: "{{ user_name }}'s FOF",
                	link: "https://mysite.com/uploader/{{current_fof}}/share_fof/",
                	picture: "https://s3-eu-west-1.amazonaws.com/epic-board/epic-board.jpg",
                	caption: window.location.href,
                	description: 'This FOF was taken by {{ user_name }}',
                	message: ''
            	});     
        	});
  		}
  	}
});