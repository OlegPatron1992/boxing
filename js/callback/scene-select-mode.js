game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('select-mode');

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
});