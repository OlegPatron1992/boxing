var game = game || {};
game.configureSceneSettings = function (scene) {
    'use strict';

    scene.onShow = function () {
        scene._updateMobileModeButton();
        scene._updateAudioButton();
    };

    scene._updateAudioButton = function () {
        scene.holder.querySelector('div[data-action="toggle-audio"] span.value').innerHTML = game.sound.isEnabled() ? 'on' : 'off';
    };

    scene.actionToggleAudio = function () {
        game.sound.setEnabled(!game.sound.isEnabled());
        scene._updateAudioButton();
    };

    scene._updateMobileModeButton = function () {
        scene.holder.querySelector('div[data-action="toggle-mobile-mode"] span.value').innerHTML = game.control.isEnabled() ? 'on' : 'off';
    };

    scene.actionToggleMobileMode = function () {
        game.control.setEnabled(!game.control.isEnabled());
        scene._updateMobileModeButton();
        if (game.control.isEnabled()) {
            game.control.configure();
        }
    };

    scene.actionFullscreen = function () {
        game.util.makeFullScreen(game.main.holder);
    };
};