var game = game || {};
(function (that) {
    'use strict';

    that.prefix = 'game';

    that._events = {
        init: []
    };

    that.on = function (eventName, callback) {
        that._events[eventName].push(callback);
    };

    that.trigger = function (eventName) {
        that._events[eventName].forEach(function (callback) {
            callback();
        });
    };

    that.init = function () {
        document.addEventListener("keydown", function (event) {
            that.keyboard.keyDown(event.keyCode);
        }, false);
        document.addEventListener("keyup", function (event) {
            that.keyboard.keyUp(event.keyCode);
        }, false);
        window.onresize = function () {
            that.main.onResize();
        };

        that.main.loadingHolder.classList.add('hidden');
        that.main.contentHolder.classList.remove('hidden');

        that.main.configure();

        that.control.initListeners();
        that.control.setEnabled(that.util.isMobile);
        if (that.util.isMobile) {
            that.control.configure();
        }

        that.drawer.configure();
        that.scenery.configure();
        that.manager.configure();
        that.sound.configure();
        that.keyboard.configure();

        that.trigger('init');

        that.scenery.showScene('main-menu');
    };
})(game);