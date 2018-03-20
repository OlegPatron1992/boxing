game.createEffect = function () {
    return (function (that) {
        that.type = null;
        that.animation = null;
        that.step = 0;
        that.position = null;

        that.setAnimation = function (animation) {
            that.animation = animation;
        };

        that.setType = function (type) {
            that.type = type;
        };

        that.isFinished = function () {
            return that.step >= that.animation.duration * 2;
        };

        that.tick = function () {
            that.step++;
            that.animation.tick();
        };

        that.setAnimation(game.createAnimation());

        return that;
    })({});
};