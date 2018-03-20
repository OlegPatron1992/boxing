game.drawer = (function (that) {
    'use strict';

    that.holder = document.getElementById(game.prefix + '-canvas');
    that.canvasContext = that.holder.getContext('2d');
    that.baseSize = null;
    that.unitSize = null;
    that.ringSize = null;
    that.colors = {
        ringBackground: '#ffac5b',
        ringLine: '#ffffff',
        ringCorner: '#ffffff',
        healthBar: '#cd0001',
        staminaBar: '#108920',
        damageEffect: '#cd1111',
        player1: '#1929cd',
        player2: '#cd4100',
        border: '#141414'
    };

    that.configure = function () {
        that.ringSize = game.main.getSize();
        that.baseSize = that.ringSize / game.config.size.ring;
        that.unitSize = that.baseSize * game.config.size.unit;

        that.holder.width = that.ringSize;
        that.holder.height = that.ringSize;
    };

    that.clear = function () {
        that.canvasContext.clearRect(0, 0, that.ringSize, that.ringSize);
    };

    that.drawRing = function () {
        that.canvasContext.save();

        that.canvasContext.fillStyle = that.colors.ringBackground;
        that.canvasContext.fillRect(
            0, 0,
            that.ringSize, that.ringSize
        );

        that.canvasContext.beginPath();
        that.canvasContext.strokeStyle = that.colors.ringLine;
        that.canvasContext.lineWidth = that.baseSize * 5;
        that.canvasContext.moveTo(
            that.baseSize * 10,
            that.baseSize * 10
        );
        that.canvasContext.lineTo(
            that.ringSize - that.baseSize * 10,
            that.baseSize * 10
        );
        that.canvasContext.lineTo(
            that.ringSize - that.baseSize * 10,
            that.ringSize - that.baseSize * 10
        );
        that.canvasContext.lineTo(
            that.baseSize * 10,
            that.ringSize - that.baseSize * 10
        );
        that.canvasContext.lineTo(
            that.baseSize * 10,
            that.baseSize * 10
        );
        that.canvasContext.stroke();
        that.canvasContext.closePath();

        that.canvasContext.lineWidth = that.baseSize * 2;
        that.canvasContext.fillStyle = that.colors.ringCorner;
        that.canvasContext.strokeStyle = that.colors.border;

        that.canvasContext.beginPath();
        that.canvasContext.arc(
            that.baseSize * 10,
            that.baseSize * 10,
            that.baseSize * 10,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();

        that.canvasContext.beginPath();
        that.canvasContext.arc(
            that.ringSize - that.baseSize * 10,
            that.baseSize * 10,
            that.baseSize * 10,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();

        that.canvasContext.beginPath();
        that.canvasContext.arc(
            that.ringSize - that.baseSize * 10,
            that.ringSize - that.baseSize * 10,
            that.baseSize * 10,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();

        that.canvasContext.beginPath();
        that.canvasContext.arc(
            that.baseSize * 10,
            that.ringSize - that.baseSize * 10,
            that.baseSize * 10,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();

        that.canvasContext.restore();
    };

    that.drawUnit = function (unit, config) {
        that.canvasContext.save();

        that.canvasContext.translate(
            unit.position.x * that.baseSize,
            unit.position.y * that.baseSize
        );
        that.canvasContext.rotate(unit.position.angle);

        that.canvasContext.lineWidth = that.baseSize * 2;

        switch (unit.action) {
            case 'block':
                that._drawArm(-that.unitSize, -0.1 * unit.animation.getValue() * that.unitSize);
                that._drawArm(that.unitSize, 0.2 * unit.animation.getValue() * that.unitSize);
                that._drawHead();
                that._drawBrow(unit.animation.getValue());
                that._drawGlove(-(0.7 - 0.1 * unit.animation.getValue()) * that.unitSize, (1.1 + 0.1 * unit.animation.getValue()) * that.unitSize, config);
                that._drawGlove((0.8 + 0.1 * unit.animation.getValue()) * that.unitSize, (0.9 - 0.1 * unit.animation.getValue()) * that.unitSize, config);
                break;
            case 'attack':
                that._drawArm(-that.unitSize, 0.2 * unit.animation.getValue() * that.unitSize);
                that._drawArm(that.unitSize, -0.2 * unit.animation.getValue() * that.unitSize);
                that._drawGlove(-(0.7 - 0.5 * unit.animation.getValue()) * that.unitSize, (1.1 + 2 * unit.animation.getValue()) * that.unitSize, config);
                that._drawGlove((0.8 + 0.1 * unit.animation.getValue()) * that.unitSize, (0.9 - 0.5 * unit.animation.getValue()) * that.unitSize, config);
                that._drawHead();
                that._drawBrow(unit.animation.getValue());
                break;
            case 'idle':
                that._drawGlove(-that.unitSize, (-0.5 + unit.animation.getValue()) * 0.1 * that.unitSize, config);
                that._drawGlove(that.unitSize, (0.5 - unit.animation.getValue()) * 0.1 * that.unitSize, config);
                that._drawArm(-that.unitSize, 0);
                that._drawArm(that.unitSize, 0);
                that._drawHead();
                that._drawBrow(unit.animation.getValue());
                break;
            case 'move':
                that._drawFoot(-that.unitSize * 0.5, (-0.5 + unit.animation.getValue()) * 2 * that.unitSize);
                that._drawFoot(that.unitSize * 0.5, (0.5 - unit.animation.getValue()) * 2 * that.unitSize);
                that._drawGlove(-that.unitSize, (-0.5 + unit.animation.getValue()) * 0.1 * that.unitSize, config);
                that._drawGlove(that.unitSize, (0.5 - unit.animation.getValue()) * 0.1 * that.unitSize, config);
                that._drawArm(-that.unitSize, 0);
                that._drawArm(that.unitSize, 0);
                that._drawHead();
                that._drawBrow(unit.animation.getValue());
                break;
        }

        that.canvasContext.restore();
    };

    that._drawFoot = function (x, y) {
        that.canvasContext.beginPath();
        that.canvasContext.arc(
            x, y,
            that.unitSize * 0.5,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that._drawGlove = function (x, y, config) {
        that.canvasContext.beginPath();
        that.canvasContext.arc(
            x, y,
            that.unitSize * 0.6,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fillStyle = config.color;
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that._drawArm = function (x, y) {
        that.canvasContext.beginPath();
        that.canvasContext.arc(
            x, y,
            that.unitSize * 0.5,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that._drawBrow = function (animationValue) {
        that.canvasContext.beginPath();
        that.canvasContext.moveTo(-that.unitSize * 0.9, that.unitSize * 0.75);
        that.canvasContext.lineTo(-that.unitSize * 0.2, that.unitSize * (0.8 + 0.1 * animationValue));
        that.canvasContext.moveTo(that.unitSize * 0.9, that.unitSize * 0.75);
        that.canvasContext.lineTo(that.unitSize * 0.2, that.unitSize * (0.8 + 0.1 * animationValue));
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that._drawHead = function () {
        that.canvasContext.beginPath();
        that.canvasContext.arc(
            0, 0,
            that.unitSize,
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that._drawHealthBar = function (unit, side) {
        that.canvasContext.strokeStyle = that.colors.border;
        that.canvasContext.strokeRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 2,
            (side == 'left' ? 1 : -1) * that.baseSize * 100, that.baseSize * 20
        );

        that.canvasContext.fillStyle = that.colors.border;
        that.canvasContext.fillRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 2,
            (side == 'left' ? 1 : -1) * that.baseSize * 100, that.baseSize * 20
        );

        that.canvasContext.fillStyle = that.colors.healthBar;
        that.canvasContext.fillRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 2,
            (side == 'left' ? 1 : -1) * that.baseSize * 100 * unit.health / game.config.unit.health, that.baseSize * 20
        );
    };

    that._drawStaminaBar = function (unit, side) {
        that.canvasContext.strokeRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 27,
            (side == 'left' ? 1 : -1) * that.baseSize * 100, that.baseSize * 20
        );

        that.canvasContext.fillStyle = that.colors.border;
        that.canvasContext.fillRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 27,
            (side == 'left' ? 1 : -1) * that.baseSize * 100, that.baseSize * 20
        );

        that.canvasContext.fillStyle = that.colors.staminaBar;
        that.canvasContext.fillRect(
            (side == 'left' ? that.baseSize * 2 : that.ringSize - that.baseSize * 2), that.baseSize * 27,
            (side == 'left' ? 1 : -1) * that.baseSize * 100 * unit.stamina / game.config.unit.health, that.baseSize * 20
        );
    };

    that._drawScoreBar = function () {
        that.canvasContext.strokeRect(
            that.ringSize / 2 - that.baseSize * 40, that.baseSize * 2,
            that.baseSize * 80, that.baseSize * 40
        );

        that.canvasContext.fillStyle = 'white';
        that.canvasContext.fillRect(
            that.ringSize / 2 - that.baseSize * 40, that.baseSize * 2,
            that.baseSize * 80, that.baseSize * 40
        );

        that.canvasContext.font = that.baseSize * 35 + 'px Arial';
        that.canvasContext.fillStyle = that.colors.border;
        that.canvasContext.textAlign = 'center';
        that.canvasContext.fillText(game.player1.score, that.ringSize / 2 - that.baseSize * 20, that.baseSize * 35);
        that.canvasContext.fillText(':', that.ringSize / 2, that.baseSize * 35);
        that.canvasContext.fillText(game.player2.score, that.ringSize / 2 + that.baseSize * 20, that.baseSize * 35);
    };

    that.drawStats = function () {
        that.canvasContext.save();

        that._drawHealthBar(game.player1, 'left');
        that._drawStaminaBar(game.player1, 'left');

        that._drawHealthBar(game.player2, 'right');
        that._drawStaminaBar(game.player2, 'right');

        that._drawScoreBar();

        that.canvasContext.restore();
    };

    that._drawDamageEffect = function (effect) {
        that.canvasContext.beginPath();
        that.canvasContext.arc(
            effect.position.x * that.baseSize, effect.position.y * that.baseSize,
            that.unitSize * (effect.animation.getValue()),
            0, 2 * Math.PI,
            false
        );
        that.canvasContext.fillStyle = that.colors.damageEffect;
        that.canvasContext.fill();
        that.canvasContext.stroke();
        that.canvasContext.closePath();
    };

    that.drawEffects = function (unit) {
        unit.effects.forEach(function (effect) {
            switch (effect.type) {
                case 'damage':
                    that._drawDamageEffect(effect);
                    break;
            }
        });
    };

    that.drawFrozenTimeout = function () {
        that.canvasContext.strokeRect(
            that.ringSize * 0.1, that.ringSize * 0.1,
            that.ringSize * 0.8, that.ringSize * 0.8
        );

        that.canvasContext.fillStyle = 'white';
        that.canvasContext.fillRect(
            that.ringSize * 0.1, that.ringSize * 0.1,
            that.ringSize * 0.8, that.ringSize * 0.8
        );

        that.canvasContext.font = that.baseSize * 150 + 'px Arial';
        that.canvasContext.fillStyle = that.colors.border;
        that.canvasContext.textAlign = 'center';
        that.canvasContext.fillText(3 - game.manager.roundResetSeconds, that.ringSize * 0.5, that.ringSize * 0.6);
    };

    that.draw = function () {
        that.clear();
        that.canvasContext.globalAlpha = 1;
        that.drawRing();
        that.canvasContext.globalAlpha = 0.5;
        that.drawEffects(game.player1);
        that.drawEffects(game.player2);
        that.canvasContext.globalAlpha = 1;
        that.drawUnit(game.player1, {
            color: that.colors.player1
        });
        that.drawUnit(game.player2, {
            color: that.colors.player2
        });
        that.canvasContext.globalAlpha = 0.8;
        that.drawStats();
        if (game.main.isFrozen()) {
            that.canvasContext.globalAlpha = 0.5;
            that.drawFrozenTimeout();
        }
    };

    return that;
})({});