game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('settings-player1-controls');

    scene.onHide = function () {
        if (game.keyboard.isChanging()) {
            game.keyboard.cancelChanging();
        }
    };
});