var game = game || {};
game.keyboard = (function (that) {
    'use strict';

    that.map = {
        "8": "backspace",
        "9": "tab",
        "13": "enter",
        "16": "shift",
        "17": "ctrl",
        "18": "alt",
        "19": "pause/break",
        "20": "caps lock",
        "27": "escape",
        "32": "space",
        "33": "page up",
        "34": "page down",
        "35": "end",
        "36": "home",
        "37": "left arrow",
        "38": "up arrow",
        "39": "right arrow",
        "40": "down arrow",
        "45": "insert",
        "46": "delete",
        "48": "0",
        "49": "1",
        "50": "2",
        "51": "3",
        "52": "4",
        "53": "5",
        "54": "6",
        "55": "7",
        "56": "8",
        "57": "9",
        "65": "a",
        "66": "b",
        "67": "c",
        "68": "d",
        "69": "e",
        "70": "f",
        "71": "g",
        "72": "h",
        "73": "i",
        "74": "j",
        "75": "k",
        "76": "l",
        "77": "m",
        "78": "n",
        "79": "o",
        "80": "p",
        "81": "q",
        "82": "r",
        "83": "s",
        "84": "t",
        "85": "u",
        "86": "v",
        "87": "w",
        "88": "x",
        "89": "y",
        "90": "z",
        "91": "left window key",
        "92": "right window key",
        "93": "select key",
        "96": "numpad 0",
        "97": "numpad 1",
        "98": "numpad 2",
        "99": "numpad 3",
        "100": "numpad 4",
        "101": "numpad 5",
        "102": "numpad 6",
        "103": "numpad 7",
        "104": "numpad 8",
        "105": "numpad 9",
        "106": "multiply",
        "107": "add",
        "109": "subtract",
        "110": "decimal point",
        "111": "divide",
        "112": "f1",
        "113": "f2",
        "114": "f3",
        "115": "f4",
        "116": "f5",
        "117": "f6",
        "118": "f7",
        "119": "f8",
        "120": "f9",
        "121": "f10",
        "122": "f11",
        "123": "f12",
        "144": "num lock",
        "145": "scroll lock",
        "186": "semi-colon",
        "187": "equal sign",
        "188": "comma",
        "189": "dash",
        "190": "period",
        "191": "forward slash",
        "192": "grave accent",
        "219": "open bracket",
        "220": "back slash",
        "221": "close braket",
        "222": "single quote"
    };
    that.settings = {
        65: {
            playerId: 'player1',
            action: 'left'
        },
        87: {
            playerId: 'player1',
            action: 'up'
        },
        68: {
            playerId: 'player1',
            action: 'right'
        },
        83: {
            playerId: 'player1',
            action: 'down'
        },
        32: {
            playerId: 'player1',
            action: 'block'
        },
        70: {
            playerId: 'player1',
            action: 'attack'
        },
        37: {
            playerId: 'player2',
            action: 'left'
        },
        38: {
            playerId: 'player2',
            action: 'up'
        },
        39: {
            playerId: 'player2',
            action: 'right'
        },
        40: {
            playerId: 'player2',
            action: 'down'
        },
        80: {
            playerId: 'player2',
            action: 'block'
        },
        79: {
            playerId: 'player2',
            action: 'attack'
        }
    };
    that._changing = null;

    that.configure = function () {
        var keyCode,
            keyHolder;

        for (keyCode in that.settings) {
            if (that.settings.hasOwnProperty(keyCode)) {
                keyHolder = that._getActionHolder(that.settings[keyCode].playerId, that.settings[keyCode].action);
                keyHolder.querySelector('span.value').innerHTML = that.map[keyCode];
            }
        }
    };

    that.changeKey = function (action, playerId) {
        if (that.isChanging()) {
            that.cancelChanging();
        }
        that._changing = {
            action: action,
            playerId: playerId
        };
        that._getActionHolder(playerId, action).classList.add('active');
    };

    that.isChanging = function () {
        return that._changing != null;
    };

    that._getActionHolder = function (playerId, action) {
        return game.scenery.getScene('settings-' + playerId + '-controls').holder.querySelector('div[data-action=' + action + ']');
    };

    that.processChanging = function (keyCode) {
        var keyHolder,
            temp;

        if (this.map.hasOwnProperty(keyCode)) {
            if (that.settings.hasOwnProperty(keyCode)) {
                keyHolder = that._getActionHolder(that.settings[keyCode].playerId, that.settings[keyCode].action).querySelector('span.value');
                keyHolder.classList.add('hidden');
            }
            for (temp in that.settings) {
                if (that.settings.hasOwnProperty(temp)) {
                    if (
                        that.settings[temp].action == that._changing.action &&
                        that.settings[temp].playerId == that._changing.playerId
                    ) {
                        delete that.settings[temp];
                    }
                }
            }
            that.settings[keyCode] = that._changing;
            keyHolder = that._getActionHolder(that.settings[keyCode].playerId, that.settings[keyCode].action).querySelector('span.value');
            keyHolder.innerHTML = that.map[keyCode];
            keyHolder.classList.remove('hidden');
            that.cancelChanging();
        }
    };

    that.cancelChanging = function () {
        var actionHolder;

        actionHolder = that._getActionHolder(that._changing.playerId, that._changing.action);
        actionHolder.classList.remove('active');
        that._changing = null;
    };

    that.keyDown = function (keyCode) {
        if (game.main.isRunning()) {
            if (that.settings.hasOwnProperty(keyCode)) {
                switch (that.settings[keyCode].action) {
                    case 'up':
                    case 'down':
                    case 'left':
                    case 'right':
                        game[that.settings[keyCode].playerId].control.setMove(that.settings[keyCode].action, true);
                        break;
                    case 'attack':
                        game[that.settings[keyCode].playerId].control.setAttack(true);
                        break;
                    case 'block':
                        game[that.settings[keyCode].playerId].control.setBlock(true);
                        break;
                }
            } else if (keyCode == 27) {
                game.scenery.showScene('pause-menu');
            }
        } else if (that.isChanging()) {
            switch (keyCode) {
                case 27:
                    that.cancelChanging();
                    break;
                default:
                    that.processChanging(keyCode);
                    break;
            }
        }
    };

    that.keyUp = function (keyCode) {
        if (game.main.isRunning()) {
            if (that.settings.hasOwnProperty(keyCode)) {
                switch (that.settings[keyCode].action) {
                    case 'up':
                    case 'down':
                    case 'left':
                    case 'right':
                        game[that.settings[keyCode].playerId].control.setMove(that.settings[keyCode].action, false);
                        break;
                    case 'attack':
                        game[that.settings[keyCode].playerId].control.setAttack(false);
                        break;
                    case 'block':
                        game[that.settings[keyCode].playerId].control.setBlock(false);
                        break;
                }
            }
        }
    };

    return that;
})({});