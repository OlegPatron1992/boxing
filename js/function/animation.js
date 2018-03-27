game.createAnimation = function () {
    return (function (that) {
        that.duration = null;
        that.step = 0;
        that.value = null;

        that.isFinished = function () {
            return that.value >= 1;
        };

        that.tick = function () {
            that.step++;
            that.value = this.step / this.duration;
        };

        that.reset = function () {
            that.step = 0;
            that.value = 0;
        };

        that.getValue = function () {
            return that.value;
        };

        that.setDuration = function (duration) {
            that.duration = duration;
        };

        that.setDuration(game.config.animation.duration);

        return that;
    })({});
};