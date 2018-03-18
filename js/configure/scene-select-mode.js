var game = game || {};
game.configureSceneSelectMode = function (scene) {
    'use strict';

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