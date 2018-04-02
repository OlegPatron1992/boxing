game.bot = (function (that) {
    'use strict';

    that._enabled = null;
    that._level = null;

    that.setEnabled = function (enabled) {
        that._enabled = enabled;
    };
    that.isEnabled = function () {
        return that._enabled;
    };

    that.easy = function () {
        that._level = 'e';
    };
    that.normal = function () {
        that._level = 'n';
    };
    that.hard = function () {
        that._level = 'h';
    };

    that.process = function () {
        switch (that._level) {
            case 'e':
                that._easy();
                break;
            case 'n':
                that._normal();
                break;
            case 'h':
                that._hard();
                break;
        }
    };

    that._easy = function () {
        if (game.manager.canAttack()) {
            if (game.player1.action.is('attack')) {
                game.player2.control.setBlock(true);
            } else {
                switch (true) {
                    case !game.player2.action.is('attack') && game.player2.stamina >= 50:
                        game.player2.control.setAttack(true);
                        break;
                    case game.player2.action.is('attack'):
                        break;
                    default:
                        game.player2.control.setBlock(true);
                        break;
                }
            }
        } else {
            game.manager.makeMoveIn(game.player2, game.player1);
        }
    };

    that._normal = function () {
        if (game.player2.action.is('attack')) {
            if (!game.manager.canAttack()) {
                game.manager.makeMoveIn(game.player2, game.player1);
            }
        } else {
            if (game.manager.canAttack()) {
                if (game.player1.action.is('attack')) {
                    game.manager.makeMoveOut(game.player2, game.player1);
                } else {
                    if (!game.player2.action.is('attack') && game.player2.stamina >= 50) {
                        game.player2.control.setAttack(true);
                    } else {
                        game.manager.makeMoveOut(game.player2, game.player1);
                    }
                }
            } else if (game.player2.stamina >= 50 && !game.player1.action.is('attack')) {
                game.manager.makeMoveIn(game.player2, game.player1);
            } else {
                game.player2.control.setBlock(true);
            }
        }
    };

    that._hard = function () {

    };

    return that;
})({});