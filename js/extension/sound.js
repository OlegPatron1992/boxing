game.sound = (function (that) {
    'use strict';

    that._soundsUrl = {
        'attack-base': './audio/attack_base.mp3',
        'attack-block': './audio/attack_block.mp3',
        'attack-move': './audio/attack_move.mp3',
        'dead1': './audio/dead1.mp3',
        'dead2': './audio/dead2.mp3',
        'game': './audio/game.mp3',
        'ring-bell': './audio/ring_bell.mp3',
        'menu-accept': './audio/menu_accept.mp3',
        'menu-back': './audio/menu_back.mp3',
        'menu-select': './audio/menu_select.mp3'
    };
    that._soundsBuffer = {};
    that._enabled = true;
    that._context = new AudioContext();
    that._loading = 0;
    that._isReady = false;

    that._soundLoaded = function () {
        that._loading--;
        if (that._loading == 0) {
            that._isReady = true;
        }
    };

    that.setEnabled = function (enabled) {
        that._enabled = enabled;
    };
    that.isEnabled = function () {
        return that._enabled;
    };

    that._loadSoundFile = function (soundName) {
        var xhr;

        that._loading++;

        xhr = new XMLHttpRequest();
        xhr.open('GET', that._soundsUrl[soundName], true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            that._context.decodeAudioData(xhr.response, function (buffer) {
                that._soundsBuffer[soundName] = buffer;
                that._soundLoaded();
            }, function (e) {
                alert('Error decoding file', e);
                that._soundLoaded();
            });
        };
        xhr.onerror = function (e) {
            alert('Error loading file', e);
            that._soundLoaded();
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

    that._createSource = function (soundName) {
        var source;

        source = that._context.createBufferSource();
        source.buffer = that._soundsBuffer[soundName];
        source.connect(that._context.destination);

        return source;
    };

    that.play = function (soundName) {
        var source;

        if (that._enabled && that._isReady) {
            source = that._createSource(soundName);
            source.loop = false;
            source.start(0);
        }

        return source;
    };

    that.loop = function (soundName) {
        var source;

        if (that._enabled && that._isReady) {
            source = that._createSource(soundName);
            source.loop = true;
            source.start(0);
        }

        return source;
    };

    return that;
})({});