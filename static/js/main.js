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
});

require(['jquery', 'sharing', 'data', 'lodash', 'login', 'less'], function($, sharing, data, _, login) {
    
    login.validate()

    $('#login-button').click(function(e) {
        e.preventDefault()
        $.post("/login", $( "#login" ).serialize()).done(function(e) {
            console.log(e)
            console.log('login pressed')
        });
    })

    var board = {}
    var audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.autobuffer = true;
    document.body.appendChild(audio);
    audio.load();
    data.boardConstructor(playAudio, function(json) {
        board = json
        _.each($('.cell .share'), function(element) { sharing.shareButton(element, board) });
        sharing.highlightSelected(_.last(window.location.pathname.split('/')))
    });

    function playAudio(event) {
        event.preventDefault();
        createSource(event.target.getAttribute('data-audio-url'));
        audio.play();
    }

    function createSource(audioUrl) {
        console.log(audio);
        if (audio.childNodes.length > 0) audio.removeChild(audio.childNodes[0]);
        var source = document.createElement('source');
        source.type = 'audio/wav';
        source.src = audioUrl;
        audio.appendChild(source);
    }

});
