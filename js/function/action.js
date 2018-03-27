game.createAction = function () {
    return (function (that) {
        that.action = null;
        that.type = null;
        that.animation = null;
        that.increasing = true;

        that.set = function (action) {
            that.action = action;
        };

        that.get = function () {
            return that.action;
        };

        that.is = function (action) {
            return that.action == action;
        };

        that.setType = function (type) {
            that.type = type;
        };

        that.getType = function () {
            return that.type;
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
            that.action = 'idle';
            that.type = null;
            that.increasing = true;
        };

        that.setAnimation(game.createAnimation());
        that.setDefaults();

        return that;
    })({});
};