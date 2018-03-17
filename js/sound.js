var game = game || {};
game.sound = (function (that) {
    'use strict';

    that._sounds = {};
    that.enabled = true;

    that._registerSound = function (soundName) {
        that._sounds[soundName] = document.getElementById('sound-' + soundName);
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
        if (that.enabled) {
            that._sounds[soundName].currentTime = 0;
            that._sounds[soundName].play();
        }
    };

    that.stop = function (soundName) {
        that._sounds[soundName].pause();
    };

    return that;
})({});