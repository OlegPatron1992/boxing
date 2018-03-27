game.createEffect = function () {
    return (function (that) {
        that.type = null;
        that.animation = null;
        that.position = null;

        that.setAnimation = function (animation) {
            that.animation = animation;
        };

        that.setType = function (type) {
            that.type = type;
        };

        that.isFinished = function () {
            return that.animation.isFinished();
        };

        that.tick = function () {
            that.animation.tick();
        };

        that.setAnimation(game.createAnimation());

        return that;
    })({});
};