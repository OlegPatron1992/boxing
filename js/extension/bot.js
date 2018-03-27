game.bot = (function (that) {
    'use strict';

    that._enabled = null;

    that.setEnabled = function (enabled) {
        that._enabled = enabled;
    };
    that.isEnabled = function () {
        return that._enabled;
    };

    that.process = function () {
        if (game.manager.canAttack()) {
            if (game.player1.action.is('attack')) {
                game.player2.control.setBlock(true);
            } else {
                if (!game.player2.action.is('attack') && game.player2.stamina < 50) {
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