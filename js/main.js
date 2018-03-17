var game = game || {};
game.main = (function (that) {
    'use strict';

    that.holder = document.getElementById('game');
    that.contentHolder = document.getElementById('game-content');
    that.loadingHolder = document.getElementById('game-loading');
    that.state = 's';
    that._updateSizeTimeout = null;
    that.frozen = false;
    that._gameTimeout = null;
    that._botTimeout = null;
    that._drawerRequest = null;

    that.isFrozen = function () {
        return that.frozen;
    };

    that.setFrozen = function (frozen) {
        that.frozen = frozen;
    };

    that.init = function () {
        that.loadingHolder.classList.add('hidden');
        that.contentHolder.classList.remove('hidden');

        game.drawer.configure();
        game.scenery.configure();
        game.manager.configure();
        game.sound.configure();
        game.keyboard.configure();
        if (game.control.isEnabled()) {
            game.control.configure();
        }

        that._updateSize();

        game.scenery.mainMenu();
    };

    that._clearTimeouts = function () {
        if (that._botTimeout) {
            clearTimeout(that._botTimeout);
            that._botTimeout = null;
        }
        if (that._drawerRequest) {
            cancelAnimFrame(that._drawerRequest);
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
        that._clearTimeouts();
    };

    that.run = function () {
        that.state = 'r';
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
        that._drawerRequest = requestAnimFrame(that._drawLoop);
    };

    that._updateSize = function () {
        var size;

        that.contentHolder.style.width = 'auto';
        that.contentHolder.style.height = 'auto';

        size = Math.min(that.holder.offsetWidth, that.holder.offsetHeight);

        that.contentHolder.style.width = size + 'px';
        that.contentHolder.style.height = size + 'px';

        game.drawer.configure();
        if (game.control.isEnabled()) {
            game.control.configure();
        }
    };

    that.onResize = function () {
        if (that._updateSizeTimeout != null) {
            clearTimeout(that._updateSizeTimeout);
            that._updateSizeTimeout = null;
        }
        setTimeout(that._updateSize, 1000 / 10);
    };

    return that;
})({});