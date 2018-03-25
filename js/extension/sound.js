game.sound = (function (that) {
    'use strict';

    that._soundsUrl = {
        'attack-base': './audio/attack_base.mp3',
        'attack-block': './audio/attack_block.mp3',
        'attack-dead': './audio/attack_dead.mp3',
        'attack-move': './audio/attack_move.mp3',
        'ring-bell': './audio/ring_bell.mp3'
    };
    that._soundsBuffer = {};
    that._enabled = true;
    that._context = new AudioContext();

    that.setEnabled = function (enabled) {
        that._enabled = enabled;
    };
    that.isEnabled = function () {
        return that._enabled;
    };

    that._loadSoundFile = function (soundName) {
        var xhr;

        xhr = new XMLHttpRequest();
        xhr.open('GET', that._soundsUrl[soundName], true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            that._context.decodeAudioData(xhr.response, function (buffer) {
                that._soundsBuffer[soundName] = buffer;
            }, function (e) {
                alert('Error decoding file', e);
            });
        };
        xhr.send();
    };

    that.configure = function () {
        var soundName;

        for (soundName in that._soundsUrl) {
            if (that._soundsUrl.hasOwnProperty(soundName)) {
                that._loadSoundFile(soundName);
            }
        }
    };

    that.play = function (soundName) {
        var source;

        if (that._enabled) {
            source = that._context.createBufferSource();
            source.buffer = that._soundsBuffer[soundName];
            source.loop = false;
            source.connect(that._context.destination);
            source.start(0);
        }
    };

    return that;
})({});