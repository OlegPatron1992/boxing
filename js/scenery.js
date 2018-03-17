var game = game || {};
game.scenery = (function (that) {
    'use strict';

    that.holder = document.getElementById('scenery-container');
    that._scenes = {};
    that._history = [];

    that._createScene = function (sceneName) {
        var scene;

        scene = game.createScene();
        scene.setHolder(document.getElementById('scene-' + sceneName));

        return scene;
    };

    that._registerScene = function (sceneName) {
        that._scenes[sceneName] = that._createScene(sceneName);
    };

    that.configure = function () {
        [
            'main-menu',
            'select-mode',
            'pause-menu',
            'settings',
            'settings-player1-controls',
            'settings-player2-controls',
        ].forEach(function (sceneName) {
            that._registerScene(sceneName);
        });
        that.hideAll();
    };

    that.showScene = function (sceneName) {
        that._scenes[sceneName].show();
    };

    that.getScene = function (sceneName) {
        return that._scenes[sceneName];
    };

    that.hideScene = function (sceneName) {
        that._scenes[sceneName].hide();
    };

    that.hideAll = function () {
        var sceneName;
        for (sceneName in that._scenes) {
            if (that._scenes.hasOwnProperty(sceneName)) {
                that._scenes[sceneName].hide();
            }
        }
    };

    that.mainMenu = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }
        that.hideAll();
        that.showScene('main-menu');
        that._history.push('mainMenu');
    };

    that.selectMode = function () {
        if (isMobile) {
            that.playerVSBot();
        } else {
            that.hideAll();
            that.showScene('select-mode');
            that._history.push('selectMode');
        }
    };

    that.playerVSBot = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }
        game.bot.enable();
        game.main.run();
        that.hideAll();
        that._history.push('playerVSBot');
    };

    that.playerVSPlayer = function () {
        if (!game.main.isStopped()) {
            game.main.reset();
        }
        game.bot.disable();
        game.main.run();
        that.hideAll();
        that._history.push('playerVSPlayer');
    };

    that.pause = function () {
        game.main.pause();
        that.hideAll();
        that._history.push('pause');
        that.showScene('pause-menu');
    };

    that.resume = function () {
        game.main.run();
        that.hideAll();
        that._history.push('resume');
    };

    that.settings = function () {
        that.hideAll();
        that.showScene('settings');
        that._history.push('settings');
    };

    that.settingsControl = function () {
        that.hideAll();
        that.showScene('settings-player1-controls');
        that._history.push('settingsControl');
    };

    that.settingsControl2 = function () {
        that.hideAll();
        that.showScene('settings-player2-controls');
        that._history.push('settingsControl2');
    };

    that.toggleAudio = function (enabled) {
        game.sound.enabled = enabled;
    };

    that.toggleFullScreen = function () {
        makeFullScreen(game.main.holder);
    };

    that.back = function () {
        that._history.splice(that._history.length - 1, 1);
        that[that._history.pop()]();
    };

    return that;
})({});