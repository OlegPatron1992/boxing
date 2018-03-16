var game = game || {};
game.bot = (function (that) {
    'use strict';

    that.enabled = null;

    that.enable = function () {
        that.enabled = true;
    };

    that.disable = function () {
        that.enabled = false;
    };

    that.isEnabled = function () {
        return that.enabled;
    };

    that.process = function () {
        if (game.manager.canAttack()) {
            if (game.player1.action == 'attack') {
                game.player2.control.setBlock(true);
            } else {
                if (!(game.player2.animation.increase && game.player2.action == 'attack') && game.player2.stamina < 50) {
                    game.player2.control.setBlock(true);
                } else {
                    game.player2.control.setAttack(true);
                }
            }
        } else {
            game.manager.makeMove(game.player2, game.player1);
        }
    };

    return that;
})({});