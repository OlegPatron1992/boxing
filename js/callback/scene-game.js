game.on('init', function () {
    'use strict';

    var scene, gameSound;

    scene = game.scenery.getScene('game');

    scene.onShow = function () {
        game.sound.play('menu-accept');
        gameSound = game.sound.loop('game');
    };

    scene.onHide = function () {
        if (gameSound) {
            gameSound.stop(0);
        }
    };
});