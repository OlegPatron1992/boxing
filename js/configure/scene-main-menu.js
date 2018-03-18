var game = game || {};
game.configureSceneMainMenu = function (scene) {
    'use strict';

    scene.onShow = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }
    };
};