game.config = (function (that) {
    'use strict';

    that.size = {
        ring: 500,
        unit: 20
    };

    that.unit = {
        stamina: 100,
        health: 100
    };

    that.stamina = {
        restore: 1,
        attack: 3
    };

    that.animation = {
        duration: 20
    };

    that.attack = {
        distance: 90,
        damage: 40,
        multiplier: {
            action: {
                idle: 0.8,
                block: 0.5,
                attack: 1.3,
                move: 1.1
            },
            type: {
                same: 1.1,
                different: 0.8
            }
        }
    };

    that.respawn = {
        player1: {
            x: that.size.ring / 2,
            y: that.size.ring / 2 + that.size.unit * 3,
            angle: Math.PI
        },
        player2: {
            x: that.size.ring / 2,
            y: that.size.ring / 2 - that.size.unit * 3,
            angle: 0
        }
    };

    that.speed = 3;

    return that;
})({});