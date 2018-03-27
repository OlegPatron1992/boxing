game.createAction = function () {
    return (function (that) {
        that.type = null;
        that.animation = null;
        that.increasing = true;

        that.set = function (type) {
            that.type = type;
        };

        that.get = function () {
            return that.type;
        };

        that.is = function (type) {
            return that.type == type;
        };

        that.setAnimation = function (animation) {
            that.animation = animation;
        };

        that.tick = function () {
            that.animation.tick();
            if (that.animation.isFinished()) {
                that.animation.reset();
                that.toggle();
            }
        };

        that.toggle = function () {
            that.increasing = !that.increasing;
        };

        that.reset = function () {
            that.animation.reset();
            that.setDefaults();
        };

        that.getValue = function () {
            return that.increasing ? that.animation.getValue() : 1 - that.animation.getValue();
        };

        that.setDefaults = function () {
            that.type = 'idle';
            that.increasing = true;
        };

        that.setAnimation(game.createAnimation());
        that.setDefaults();

        return that;
    })({});
};