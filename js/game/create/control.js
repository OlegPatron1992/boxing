var game = game || {};
game.createControl = function () {
    return (function (that) {
        that.move = [];
        that.attack = false;
        that.block = false;

        that.setMove = function (direction, enable) {
            var index;

            if (enable) {
                if (['left', 'right'].indexOf(direction) > -1) {
                    if (direction == 'left') {
                        index = this.move.indexOf('right');
                        if (index > -1) {
                            this.move.splice(index, 1);
                        }
                    } else {
                        index = this.move.indexOf('left');
                        if (index > -1) {
                            this.move.splice(index, 1);
                        }
                    }
                } else {
                    if (direction == 'up') {
                        index = this.move.indexOf('down');
                        if (index > -1) {
                            this.move.splice(index, 1);
                        }
                    } else {
                        index = this.move.indexOf('up');
                        if (index > -1) {
                            this.move.splice(index, 1);
                        }
                    }
                }
            }

            index = this.move.indexOf(direction);
            if (enable) {
                if (index == -1) {
                    that.move.push(direction);
                }

                that.attack = false;
            } else {
                if (index > -1) {
                    that.move.splice(index, 1);
                }
            }
        };

        that.setAttack = function (enable) {
            that.attack = enable;
        };

        that.setBlock = function (enable) {
            that.block = enable;
            if (enable) {
                that.attack = false;
            }
        };

        that.getAction = function () {
            if (that.attack) {
                return 'attack';
            }
            if (that.block) {
                return 'block';
            }
            if (that.move.length) {
                return 'move';
            }
            return 'idle';
        };

        that.makeIdle = function () {
            that.attack = false;
            that.block = false;
            that.move = [];
        };

        return that;
    })({});
};