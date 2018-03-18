var game = game || {};
game.configureSceneSettingsPlayer1Controls = function (scene) {
    'use strict';

    scene.onHide = function () {
        if (game.keyboard.isChanging()) {
            game.keyboard.cancelChanging();
        }
    };
};