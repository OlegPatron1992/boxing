var game = game || {};
game.configureSceneSelectMode = function (scene) {
    'use strict';

    scene.onShow = function () {
        if (game.control.isEnabled()) {

        }
    };

    scene.actionPlayerVsBot = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }

        game.bot.setEnabled(true);
        game.main.run();
        game.scenery.showScene('game');
    };

    scene.actionPlayerVsPlayer = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }

        game.bot.setEnabled(false);
        game.main.run();
        game.scenery.showScene('game');
    };
};