game.on('init', function () {
    'use strict';

    var scene, run;

    scene = game.scenery.getScene('select-bot-level');

    run = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }

        game.bot.setEnabled(true);
        game.main.run();
        game.scenery.showScene('game');
    };

    scene.actionEasy = function () {
        game.bot.easy();
        run();
    };
    scene.actionHard = function () {
        game.bot.hard();
        run();
    };
});