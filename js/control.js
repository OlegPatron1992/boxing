var game = game || {};
game.control = (function (that) {
    'use strict';

    that.holder = document.getElementById('game-control');
    that.buttonMoveHolder = document.getElementById('button-move');
    that.buttonAttackHolder = document.getElementById('button-attack');
    that.buttonBlockHolder = document.getElementById('button-block');
    that.buttonPauseHolder = document.getElementById('button-pause');
    that._size = null;
    that._enabled = true;

    that.hide = function () {
        that.holder.classList.add('hidden');
    };

    that.show = function () {
        that.holder.classList.remove('hidden');
    };

    that.enable = function () {
        that._enabled = true;
    };

    that.disable = function () {
        that._enabled = false;
    };

    that.isEnabled = function () {
        return that._enabled;
    };

    that._processMoveTouch = function (x, y) {
        var temp,
            dX,
            dY,
            moveDirections;

        temp = that.buttonMoveHolder.getBoundingClientRect();

        dX = x - (temp.width / 2 + temp.left);
        dY = y - (temp.height / 2 + temp.top);

        game.player1.control.cancelMove();

        switch (true) {
            case dY > 0 && Math.abs(dX) / dY < Math.sin(Math.PI / 8):
                moveDirections = ['down'];
                break;
            case dY < 0 && Math.abs(dX) / -dY < Math.sin(Math.PI / 8):
                moveDirections = ['up'];
                break;
            case dX > 0 && Math.abs(dY) / dX < Math.sin(Math.PI / 8):
                moveDirections = ['right'];
                break;
            case dX < 0 && Math.abs(dY) / -dX < Math.sin(Math.PI / 8):
                moveDirections = ['left'];
                break;
            case dX > 0 && dY > 0:
                moveDirections = ['right', 'down'];
                break;
            case dX > 0 && dY < 0:
                moveDirections = ['right', 'up'];
                break;
            case dX < 0 && dY < 0:
                moveDirections = ['left', 'up'];
                break;
            case dX < 0 && dY > 0:
                moveDirections = ['left', 'down'];
                break;
            default:
                moveDirections = [];
                break;
        }

        moveDirections.forEach(function (direction) {
            game.player1.control.setMove(direction, true);
        });
    };
    that._cancelMoveTouch = function () {
        game.player1.control.cancelMove();
    };

    that._processAttachTouch = function () {
        game.player1.control.setAttack(true);
    };
    that._cancelAttachTouch = function () {
        game.player1.control.setAttack(false);
    };

    that._processBlockTouch = function () {
        game.player1.control.setBlock(true);
    };
    that._cancelBlockTouch = function () {
        game.player1.control.setBlock(false);
    };

    that._processPauseTouch = function () {
        game.scenery.pause();
    };

    that.initListeners = function () {
        that.buttonMoveHolder.addEventListener("touchstart", function (event) {
            event.preventDefault();
            var touches = event.changedTouches;
            that._processMoveTouch(touches[0].pageX, touches[0].pageY);
        }, false);
        that.buttonMoveHolder.addEventListener("touchend", function (event) {
            event.preventDefault();
            that._cancelMoveTouch();
        }, false);
        that.buttonMoveHolder.addEventListener("touchcancel", function (event) {
            event.preventDefault();
            that._cancelMoveTouch();
        }, false);
        that.buttonMoveHolder.addEventListener("touchmove", function (event) {
            event.preventDefault();
            var touches = event.changedTouches;
            that._processMoveTouch(touches[0].pageX, touches[0].pageY);
        }, false);

        that.buttonAttackHolder.addEventListener("touchstart", function (event) {
            event.preventDefault();
            that._processAttachTouch();
        }, false);
        that.buttonAttackHolder.addEventListener("touchend", function (event) {
            event.preventDefault();
            that._cancelAttachTouch();
        }, false);
        that.buttonAttackHolder.addEventListener("touchcancel", function (event) {
            event.preventDefault();
            that._cancelAttachTouch();
        }, false);

        that.buttonBlockHolder.addEventListener("touchstart", function (event) {
            event.preventDefault();
            that._processBlockTouch();
        }, false);
        that.buttonBlockHolder.addEventListener("touchend", function (event) {
            event.preventDefault();
            that._cancelBlockTouch();
        }, false);
        that.buttonBlockHolder.addEventListener("touchcancel", function (event) {
            event.preventDefault();
            that._cancelBlockTouch();
        }, false);

        that.buttonPauseHolder.addEventListener("touchstart", function (event) {
            event.preventDefault();
            that._processPauseTouch();
        }, false);
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