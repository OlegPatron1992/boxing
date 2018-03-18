var game = game || {};
game.configureSceneSettingsPlayer2Controls = function (scene) {
    'use strict';

    scene.onHide = function () {
        if (game.keyboard.isChanging()) {
            game.keyboard.cancelChanging();
        }
    };
};