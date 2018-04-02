game.manager = (function (that) {
    'use strict';

    that._roundResetInterval = null;
    that.roundResetSeconds = null;
    that._distance = null;

    that.configure = function () {
        game.player1 = that._createUnit('player1');
        that._place(game.player1, game.config.respawn.player1);

        game.player2 = that._createUnit('player2');
        that._place(game.player2, game.config.respawn.player2);

        that.round();
    };

    that._createUnit = function (id) {
        var unit;

        unit = game.createUnit();
        unit.setId(id);

        return unit;
    };

    that.tickPlayers = function () {
        that.process(game.player1, game.player2);
        that.process(game.player2, game.player1);
        if (!game.main.isFrozen()) {
            if (!game.player2.isAlive() || !game.player1.isAlive()) {
                that.round();
            }
        }
        if (game.player1.action.is('move') || game.player2.action.is('move')) {
            that._distance = null;
            that._updateAngle(game.player1, game.player2);
        }
    };

    that._resetUnit = function (unit) {
        unit.setDefaults();
        unit.action.reset();
        unit.control.makeIdle();
        that._place(unit, game.config.respawn[unit.id]);
        unit.resetEffects();
    };

    that._processRound = function () {
        that._resetUnit(game.player1);
        that._resetUnit(game.player2);
        that._distance = null;
        game.sound.play('ring-bell');
        game.main.setFrozen(false);
    };

    that.round = function () {
        game.main.setFrozen(true);
        that.roundResetSeconds = 0;

        if (that._roundResetInterval != null) {
            clearInterval(that._roundResetInterval);
            that._roundResetInterval = null;
        }

        that._roundResetInterval = setInterval(function () {
            if (game.main.isRunning()) {
                if (that.roundResetSeconds >= 2) {
                    that._processRound();
                    clearInterval(that._roundResetInterval);
                    that._roundResetInterval = null;
                    that.roundResetSeconds = null;
                } else {
                    that.roundResetSeconds++;
                }
            }
        }, 1000);
    };

    that.process = function (unit, altUnit) {
        if (game.main.isFrozen()) {
            if (!unit.action.is('idle')) {
                unit.action.reset();
            } else {
                unit.action.tick();
            }

            unit.restoreHealth();
        } else {
            if (!unit.action.is(unit.control.getAction())) {
                unit.action.reset();
                unit.action.set(unit.control.getAction());
                if (unit.action.is('attack')) {
                    if (unit.control.isMoving('left')) {
                        unit.action.setType('left');
                    } else {
                        unit.action.setType('right');
                    }
                }
            } else {
                unit.action.tick();
            }
        }

        if (unit.action.is('block')) {
            if (unit.control.isMoving('left')) {
                unit.action.setType('left');
            } else {
                unit.action.setType('right');
            }
        }

        unit.restoreStamina();

        switch (unit.action.get()) {
            case 'move':
                that.move(unit, altUnit);
                break;
            case 'attack':
                that.attack(unit, altUnit);
                break;
        }

        unit.effects.forEach(function (effect) {
            if (!effect.isFinished()) {
                effect.tick();
            } else {
                unit.removeEffect(effect);
            }
        });
    };

    that._place = function (unit, position) {
        unit.setPosition(position.x, position.y);
        unit.setAngle(position.angle);
    };

    that.attack = function (unit, altUnit) {
        var temp,
            damage,
            effect;

        unit.fatigue(game.config.stamina.attack);
        if (unit.stamina > 0) {
            if (that.canAttack()) {
                temp = that._getDistance() / game.config.attack.distance;
                if (unit.action.getValue() >= temp) {
                    damage = game.config.attack.damage *
                        temp *
                        game.config.attack.multiplier.action[altUnit.action.get()];
                    if (unit.action.getType() == altUnit.action.getType()) {
                        damage *= game.config.attack.multiplier.type.same;
                    } else {
                        damage *= game.config.attack.multiplier.type.different;
                    }
                    altUnit.damage(damage);
                    effect = game.createEffect();
                    effect.setType('damage');
                    effect.position = altUnit.position;
                    altUnit.addEffect(effect);
                    unit.action.reset();
                    switch (true) {
                        case !altUnit.isAlive():
                            unit.score++;
                            game.sound.play('attack-dead');
                            break;
                        case altUnit.action.is('move'):
                            game.sound.play('attack-move');
                            break;
                        case altUnit.action.is('block'):
                            game.sound.play('attack-block');
                            break;
                        default:
                            game.sound.play('attack-base');
                            break;
                    }
                }
            }
        } else {
            unit.action.reset();
        }
    };

    that.move = function (unit, altUnit) {
        var speed,
            x,
            y;

        speed = unit.control.move.length > 1 ? game.config.speed / Math.sqrt(2) : game.config.speed;

        x = unit.position.x;
        y = unit.position.y;

        unit.control.move.forEach(function (direction) {
            switch (direction) {
                case 'up':
                    y -= speed;
                    break;
                case 'down':
                    y += speed;
                    break;
                case 'left':
                    x -= speed;
                    break;
                case 'right':
                    x += speed;
                    break;
            }
        });

        x = Math.min(game.config.size.ring - game.config.size.unit, x);
        x = Math.max(game.config.size.unit, x);

        y = Math.min(game.config.size.ring - game.config.size.unit, y);
        y = Math.max(game.config.size.unit, y);

        if (Math.pow(x - altUnit.position.x, 2) + Math.pow(y - altUnit.position.y, 2) >= Math.pow(game.config.size.unit * 2, 2)) {
            unit.position.x = x;
            unit.position.y = y;
        }
    };

    that._updateAngle = function (unit, altUnit) {
        var angle,
            dX,
            dY;

        dX = unit.position.x - altUnit.position.x;
        dY = unit.position.y - altUnit.position.y;

        angle = -Math.atan(dX / dY);
        if (dX <= 0 && dY >= 0 || dX >= 0 && dY >= 0) {
            angle += Math.PI;
        }

        unit.position.angle = angle;
        altUnit.position.angle = Math.PI + angle;
    };

    that.canAttack = function () {
        return that._getDistance() < game.config.attack.distance;
    };

    that._getDistance = function () {
        if (that._distance === null) {
            that._distance = Math.sqrt(
                Math.pow(game.player1.position.x - game.player2.position.x, 2) +
                Math.pow(game.player1.position.y - game.player2.position.y, 2)
            );
        }
        return that._distance;
    };

    that.makeMoveIn = function (unit, altUnit) {
        var dX, dY;

        dX = unit.position.x - altUnit.position.x;
        dY = unit.position.y - altUnit.position.y;

        unit.control.makeIdle();
        that.getMoveDirections(dX, dY).forEach(function (direction) {
            unit.control.setMove(direction, true);
        });
    };

    that.makeMoveOut = function (unit, altUnit) {
        var dX, dY;

        dX = -(unit.position.x - altUnit.position.x);
        dY = -(unit.position.y - altUnit.position.y);

        unit.control.makeIdle();
        that.getMoveDirections(dX, dY).forEach(function (direction) {
            unit.control.setMove(direction, true);
        });
    };

    that.getMoveDirections = function (dX, dY) {
        var moveDirections = [];

        if (Math.abs(dX) > game.config.speed) {
            if (dX < 0) {
                moveDirections.push('right');
            } else {
                moveDirections.push('left');
            }
        }

        if (Math.abs(dY) > game.config.speed) {
            if (dY < 0) {
                moveDirections.push('down');
            } else {
                moveDirections.push('up');
            }
        }

        return moveDirections;
    };

    return that;
})({});