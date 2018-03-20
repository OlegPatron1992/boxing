game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('pause-menu');

    scene.onShow = function () {
        game.main.pause();
    };

    scene.actionResume = function () {
        game.main.run();
        game.scenery.showScene('game');
    };
});