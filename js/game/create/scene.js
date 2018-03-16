var game = game || {};
game.createScene = function () {
    return (function (that) {
        that.holder = null;

        that.setHolder = function (element) {
            that.holder = element;
        };

        that.show = function () {
            that.holder.style.display = 'block';
        };

        that.hide = function () {
            that.holder.style.display = 'none';
        };

        return that;
    })({});
};