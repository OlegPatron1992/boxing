game.main = (function (that) {
    'use strict';

    that.holder = document.getElementById(game.prefix + '-main');
    that.contentHolder = document.getElementById(game.prefix + '-content');
    that.loadingHolder = document.getElementById(game.prefix + '-loading');
    that.state = 's';
    that._size = null;
    that._configureTimeout = null;
    that._frozen = false;
    that._gameTimeout = null;
    that._botTimeout = null;
    that._drawerRequest = null;

    that.getSize = function () {
        return that._size;
    };

    that.isFrozen = function () {
        return that._frozen;
    };

    that.setFrozen = function (frozen) {
        that._frozen = frozen;
    };

    that._clearTimeouts = function () {
        if (that._botTimeout) {
            clearTimeout(that._botTimeout);
            that._botTimeout = null;
        }
        if (that._gameTimeout) {
            clearTimeout(that._gameTimeout);
            that._gameTimeout = null;
        }
    };

    that.reset = function () {
        game.manager.round();
        game.player1.score = 0;
        game.player2.score = 0;
        game.state = 's';
        that._clearTimeouts();
    };

    that.pause = function () {
        that.state = 'p';
        if (game.control.isEnabled()) {
            game.control.hide();
        }
        that._clearTimeouts();
    };

    that.run = function () {
        that.state = 'r';
        if (game.control.isEnabled()) {
            game.control.show()
        }
        that._gameLoop();
        if (game.bot.isEnabled()) {
            that._botLoop();
        }
    };

    that.isPaused = function () {
        return that.state == 'p';
    };

    that.isRunning = function () {
        return that.state == 'r';
    };

    that.isStopped = function () {
        return that.state == 's';
    };

    that._gameLoop = function () {
        game.manager.tickPlayers();
        if (that._drawerRequest == null) {
            that._drawerRequest = game.util.requestAnimationFrame(function () {
                game.drawer.draw();
                that._drawerRequest = null;
            });
        }
        that._gameTimeout = setTimeout(that._gameLoop, 1000 / 30);
    };

    that._botLoop = function () {
        if (!that.isFrozen()) {
            game.bot.process();
        }
        that._botTimeout = setTimeout(that._botLoop, 1000 / 5);
    };

    that.configure = function () {
        that.contentHolder.style.width = 'auto';
        that.contentHolder.style.height = 'auto';

        that._size = Math.min(that.holder.offsetWidth, that.holder.offsetHeight);

        that.contentHolder.style.width = that._size + 'px';
        that.contentHolder.style.height = that._size + 'px';

        game.drawer.configure();
        if (game.control.isEnabled()) {
            game.control.configure();
        }
    };

    that.onResize = function () {
        if (that._configureTimeout != null) {
            clearTimeout(that._configureTimeout);
            that._configureTimeout = null;
        }
        that._configureTimeout = setTimeout(that.configure, 1000 / 10);
    };

    return that;
})({});