var game = game || {};
game.control = (function (that) {
    'use strict';

    that.holder = document.getElementById('game-control');
    that.buttonMoveHolder = document.getElementById('button-move');
    that.buttonAttackHolder = document.getElementById('button-attack');
    that.buttonBlockHolder = document.getElementById('button-block');
    that.buttonPauseHolder = document.getElementById('button-pause');
    that._size = null;
    that.enabled = true;

    that.hide = function () {
        that.holder.classList.add('hidden');
    };

    that.show = function () {
        that.holder.classList.remove('hidden');
    };

    that.enable = function () {
        that.enabled = true;
    };

    that.disable = function () {
        that.enabled = false;
    };

    that.isEnabled = function () {
        return that.enabled;
    };

    that.configure = function () {
        that._size = Math.min(game.main.holder.offsetWidth, game.main.holder.offsetHeight);

        that.buttonMoveHolder.style.width = that._size * 0.3 + 'px';
        that.buttonMoveHolder.style.height = that._size * 0.3 + 'px';
        that.buttonMoveHolder.style.left = that._size * 0.05 + 'px';
        that.buttonMoveHolder.style.bottom = that._size * 0.05 + 'px';

        that.buttonAttackHolder.style.width = that._size * 0.2 + 'px';
        that.buttonAttackHolder.style.height = that._size * 0.2 + 'px';
        that.buttonAttackHolder.style.right = that._size * 0.2 + 'px';
        that.buttonAttackHolder.style.bottom = that._size * 0.05 + 'px';

        that.buttonBlockHolder.style.width = that._size * 0.2 + 'px';
        that.buttonBlockHolder.style.height = that._size * 0.2 + 'px';
        that.buttonBlockHolder.style.right = that._size * 0.05 + 'px';
        that.buttonBlockHolder.style.bottom = that._size * 0.3 + 'px';

        that.buttonPauseHolder.style.width = that._size * 0.15 + 'px';
        that.buttonPauseHolder.style.height = that._size * 0.15 + 'px';
        that.buttonPauseHolder.style.right = that._size * 0.05 + 'px';
        that.buttonPauseHolder.style.top = that._size * 0.05 + 'px';
    };

    return that;
})({});