require.config({
    baseUrl: "/static/lib/",
    paths: {
        jquery: 'jquery-2.0.3.min',
        lodash: 'lodash.min',
        less: 'less-1.6.0.min',
        data: '../js/data',
        sharing: '../js/sharing',
        login: '../js/login',
    }
})

require(['jquery', 'sharing', 'data', 'lodash', 'login', 'less'], function($, sharing, data, _, login) {
    login.registerEventHandlers(function(authReply) {
        $('#login').hide(500)
        createBoard()        
    })

    function createBoard() {       
        data.boardConstructor(playAudio, function(json) {
            _.each($('.cell .share'), function(element) { 
                sharing.shareButton(element, json)
                //createAudioElement(element) 
            })
            sharing.highlightSelected(_.last(window.location.pathname.split('/')))
        })
   }

    function playAudio(event) {
        event.preventDefault()
        $(event.target).parent().children('audio')[0].play()
    }
})
