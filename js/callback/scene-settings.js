game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('settings');

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
        game.sound.play('menu-accept');
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
        game.sound.play('menu-accept');
    };

    scene.actionFullscreen = function () {
        game.util.makeFullScreen(game.main.holder);
        game.sound.play('menu-accept');
    };
});