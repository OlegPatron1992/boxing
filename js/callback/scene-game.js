game.on('init', function () {
    'use strict';

    var scene;

    scene = game.scenery.getScene('game');

    scene.onShow = function () {
        game.sound.play('menu-accept');
    };
});