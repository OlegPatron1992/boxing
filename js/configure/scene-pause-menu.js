var game = game || {};
game.configureScenePauseMenu = function (scene) {
    'use strict';

    scene.onShow = function () {
        game.main.pause();
    };

    scene.actionResume = function () {
        game.main.run();
        game.scenery.showScene('game');
    };
};