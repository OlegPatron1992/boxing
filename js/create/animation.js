var game = game || {};
game.createAnimation = function () {
    return (function (that) {
        that.increase = true;
        that.duration = game.config.animation.duration;
        that.step = 0;
        that.value = null;

        that.toggle = function () {
            if (that.increase) {
                that.increase = false;
            } else {
                that.increase = true;
            }
        };

        that.tick = function () {
            if (that.increase) {
                that.step++;
            } else {
                that.step--;
            }
            if (that.step > that.duration) {
                that.step = that.duration;
                that.toggle();
            }
            if (that.step < 0) {
                that.step = 0;
                that.toggle();
            }
            that.value = this.step / this.duration;
        };

        that.reset = function () {
            that.step = 0;
            that.increase = true;
            that.value = 0;
        };

        that.getValue = function () {
            return that.value;
        };

        that.setDuration = function (duration) {
            that.duration = duration;
        };

        return that;
    })({});
};