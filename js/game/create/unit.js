var game = game || {};
game.createUnit = function () {
    return (function (that) {
        that.id = null;
        that.position = {
            x: null,
            y: null,
            angle: 0
        };
        that.health = null;
        that.stamina = null;
        that.animation = null;
        that.control = null;
        that.effects = [];
        that.action = null;
        that.score = 0;

        that.addEffect = function (effect) {
            that.effects.push(effect);
        };

        that.removeEffect = function (effect) {
            var index;

            index = that.effects.indexOf(effect);
            if (index > -1) {
                that.effects.splice(index, 1);
            }
        };

        that.resetEffects = function () {
            that.effects = [];
        };

        that.setAnimation = function (animation) {
            that.animation = animation;
        };

        that.setControl = function (control) {
            that.control = control;
        };

        that.setDefaults = function () {
            that.health = game.config.unit.health;
            that.stamina = game.config.unit.stamina;
        };

        that.setPosition = function (x, y) {
            that.position.x = x;
            that.position.y = y;
        };

        that.setAngle = function (angle) {
            that.position.angle = angle;
        };

        that.restoreStamina = function () {
            that.stamina = Math.min(100, that.stamina + 1);
        };

        that.fatigue = function (amount) {
            that.stamina = Math.max(0, that.stamina - amount);
        };

        that.restoreHealth = function () {
            that.health = Math.min(100, that.health + 1);
        };

        that.damage = function (amount) {
            that.health = Math.max(0, that.health - amount);
        };

        that.isAlive = function () {
            return that.health > 0;
        };

        that.setId = function (id) {
            that.id = id;
        };

        that.setAnimation(game.createAnimation());
        that.setControl(game.createControl());
        that.setDefaults();

        return that;
    })({});
};