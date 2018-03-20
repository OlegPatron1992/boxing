game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('main-menu');

    scene.onShow = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }
    };
});