require.config({
    baseUrl: "/lib/",
    paths: {
        jquery: 'jquery-2.0.3.min',
        data: '../js/data',
        sharing: '../js/sharing',
        lodash: 'lodash.min',
        less: 'less-1.6.0.min'
    }
});

require(['jquery', 'sharing', 'data', 'lodash', 'less'], function($, sharing, data, _) {
    var board = {}
    var audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.autobuffer = true;
    document.body.appendChild(audio);
    audio.load();
    data.boardConstructor(playAudio, function(json) {
        board = json
        _.each($('.cell .share'), function(element) { sharing.shareButton(element, board) });
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
