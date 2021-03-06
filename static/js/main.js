require.config({
    baseUrl: "/static/lib/",
    paths: {
        jquery: 'jquery-2.0.3.min',
        lodash: 'lodash.min',
        less: 'less-1.6.0.min',
        data: '../js/data',
        sharing: '../js/sharing',
        auth: '../js/auth',
    }
})

require(['jquery', 'sharing', 'data', 'lodash', 'auth', 'less'], function($, sharing, data, _, auth) {
    
    if (document.cookie.indexOf('epicboardauth') < 0) {
        auth.registerEventHandlers(function(json) {
            authDone(true)
        })
    } else {
        authDone(false)
    }

    function authDone(animate) {
        var timeout = animate ? 500 : 0
        $('#auth').hide(timeout)
        createBoard()        
    }

    function createBoard() {       
        data.boardConstructor(playAudio, function(json) {
            _.each($('.cell .share'), function(element) { 
                sharing.shareButton(element, json)
            })
            sharing.highlightSelected(_.last(window.location.pathname.split('/')))
        })
   }

    function playAudio(event) {
        event.preventDefault()
        $(event.target).parent().children('audio')[0].play()
    }
})
