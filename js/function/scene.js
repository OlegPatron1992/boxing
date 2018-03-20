game.createScene = function () {
    return (function (that) {
        that.holder = null;

        that.setHolder = function (element) {
            that.holder = element;
        };

        that.show = function () {
            that.holder.classList.remove('hidden');
        };

        that.hide = function () {
            that.holder.classList.add('hidden');
        };

        that.onShow = function () {

        };

        that.onHide = function () {

        };

        return that;
    })({});
};