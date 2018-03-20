game.sound = (function (that) {
    'use strict';

    that._sounds = {};
    that._enabled = true;

    that.setEnabled = function (enabled) {
        that._enabled = enabled;
    };
    that.isEnabled = function () {
        return that._enabled;
    };

    that._registerSound = function (soundName) {
        that._sounds[soundName] = document.getElementById(game.prefix + '-sound-' + soundName);
    };

    that.configure = function () {
        [
            'attack-base',
            'attack-block',
            'attack-dead',
            'attack-move',
            'ring-bell'
        ].forEach(function (sceneName) {
            that._registerSound(sceneName);
        });
    };

    that.play = function (soundName) {
        if (that._enabled) {
            that._sounds[soundName].currentTime = 0;
            that._sounds[soundName].play();
        }
    };

    that.stop = function (soundName) {
        that._sounds[soundName].pause();
    };

    return that;
})({});