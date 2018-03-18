var game = game || {};
game.util = (function (that) {
        'use strict';

        that.requestAnimationFrame = function (callback) {
            (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }).call(window, callback);
        };

        that.cancelAnimationFrame = function (id) {
            (
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                function (timeout) {
                    window.clearTimeout(timeout);
                }
            ).call(window, id);
        };

        that.makeFullScreen = function (element) {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        };

        that.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        that.camelCaseToId = function (string) {
            return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        };

        that.idToCamelCase = function (string) {
            return string.split('-').map(function (segment, index) {
                if (index > 0) {
                    return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
                } else {
                    return segment.toLowerCase();
                }
            }).join('');
        };

        return that;
    }
)({});