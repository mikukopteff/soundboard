require.config({
    baseUrl: "/lib/",
    paths: {
        jquery: 'jquery-2.0.3.min',
        data: '../js/data',
        lodash: 'lodash.min',
        less: 'less-1.6.0.min'
    }
});

require(['jquery', 'data', 'lodash', 'less'], function($, data, _) {
    var audio = document.createElement('audio');
    audio.setAttribute('preload', 'auto');
    audio.autobuffer = true;
    document.body.appendChild(audio);
    audio.load();
    data.getBoardData(playAudio);

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
