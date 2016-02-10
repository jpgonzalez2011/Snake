var Snake = function () {
  this.direction = "N";
  this.segments = [[10,10]];
  this.head = this.segments[0];
};

Snake.prototype.move = function () {
  this.lastPosition = this.segments[this.segments.length - 1];
  for(i = this.segments.length - 1; i > 0; i--) {
    this.segments[i] = this.segments[i - 1];
  }
  if (this.direction === "N") {
    this.segments[0] = this.plus(this.head, [-1, 0]);
  } else if (this.direction === "E") {
    this.segments[0] = this.plus(this.head, [0, 1]);
  } else if (this.direction === "W") {
    this.segments[0] = this.plus(this.head, [0, -1]);
  } else if (this.direction === "S") {
    this.segments[0] = this.plus(this.head, [1, 0]);
  }
  if (this.segments[0][0] > 19){
    this.segments[0][0] = 0;
  } else if (this.segments[0][0] < 0) {
    this.segments[0][0] = 19;
  } else if (this.segments[0][1] > 19) {
    this.segments[0][1] = 0;
  } else if (this.segments[0][1] < 0) {
    this.segments[0][1] = 19;
  }

  this.head = this.segments[0];

};

Snake.prototype.turn = function (direction) {
  if (this.isOpposite(direction)) {
    return;
  } else {
    this.direction = direction;
  }
};

Snake.prototype.isOpposite = function (dir) {
  if (this.direction === "N") {
    return dir === "S";
  } else if (this.direction === "E") {
    return dir === "W";
  } else if (this.direction === "W") {
    return dir === "E";
  } else if (this.direction === "S") {
    return dir === "N";
  }
};

Snake.prototype.plus = function (pos1, direction) {
  return [pos1[0] + direction[0], pos1[1] + direction[1]];
};

Snake.prototype.includedInPositions = function (pos1, positions) {
  for (var i = 0; i < positions.length; i++){
    var random_snake = new Snake();
    if (random_snake.equal(pos1, positions[i])) {
      return true;
    }
  }
  return false;
};

Snake.prototype.equal = function (pos1, pos2) {
  return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
};

var Board = function () {
  this.grid = [];
  for (var i = 0; i < 20; i++) {
    this.grid.push(new Array(20));
  }
  this.snake = new Snake();
  this.apple = this.setApple();
};
Board.prototype.setApple = function () {
  return [parseInt(Math.random() * 20),parseInt(Math.random() * 20)];
};

Board.prototype.checkApple = function () {
  if (this.snake.equal(this.snake.head, this.apple)) {
    this.snake.segments.push(this.snake.lastPosition);
    this.apple = this.setApple();
  }
};

module.exports = Board;
