game.scenery = (function (that) {
    'use strict';

    that.holder = document.getElementById(game.prefix + '-scenery-container');
    that._scenes = {};
    that._history = [];

    that._createScene = function (sceneId) {
        that._scenes[sceneId] = game.createScene();
        that._scenes[sceneId].setHolder(document.getElementById(game.prefix + '-scene-' + sceneId));
    };

    that.configure = function () {
        [
            'game',
            'main-menu',
            'select-mode',
            'pause-menu',
            'settings',
            'settings-player1-controls',
            'settings-player2-controls'
        ].forEach(function (sceneId) {
            that._createScene(sceneId);
        });
        that.hideAll();
    };

    that.getScene = function (sceneId) {
        return that._scenes[sceneId];
    };

    that.hideScene = function (sceneId) {
        that._scenes[sceneId].onHide();
        that._scenes[sceneId].hide();
    };

    that.hideAll = function () {
        var sceneId;
        for (sceneId in that._scenes) {
            if (that._scenes.hasOwnProperty(sceneId)) {
                that._scenes[sceneId].hide();
            }
        }
    };

    that.showScene = function (sceneId) {
        if (that._history.length > 0) {
            that.hideScene(that._history[that._history.length - 1]);
        }
        that._scenes[sceneId].onShow();
        that._scenes[sceneId].show();
        that._history.push(sceneId);
    };

    that.callSceneAction = function (sceneId, action) {
        that._scenes[sceneId][game.util.idToCamelCase('action-' + action)]();
    };

    that.back = function () {
        that.hideScene(that._history.pop());
        that.showScene(that._history.pop());
    };

    return that;
})({});