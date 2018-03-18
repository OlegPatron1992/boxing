var game = game || {};
game.main = (function (that) {
    'use strict';

    that.holder = document.getElementById('game');
    that.contentHolder = document.getElementById('game-content');
    that.loadingHolder = document.getElementById('game-loading');
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

    that.init = function () {
        that.loadingHolder.classList.add('hidden');
        that.contentHolder.classList.remove('hidden');

        that.configure();

        game.control.initListeners();
        game.control.setEnabled(game.util.isMobile);
        if (game.util.isMobile) {
            game.control.configure();
        }

        game.drawer.configure();
        game.scenery.configure();
        game.manager.configure();
        game.sound.configure();
        game.keyboard.configure();

        game.scenery.showScene('main-menu');
    };

    that._clearTimeouts = function () {
        if (that._botTimeout) {
            clearTimeout(that._botTimeout);
            that._botTimeout = null;
        }
        if (that._drawerRequest) {
            game.util.cancelAnimationFrame(that._drawerRequest);
            that._drawerRequest = null;
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
        that._drawLoop();
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
        that._gameTimeout = setTimeout(that._gameLoop, 1000 / 40);
    };

    that._botLoop = function () {
        if (!that.isFrozen()) {
            game.bot.process();
        }
        that._botTimeout = setTimeout(that._botLoop, 1000 / 10);
    };

    that._drawLoop = function () {
        game.drawer.draw();
        that._drawerRequest = game.util.requestAnimationFrame(that._drawLoop);
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