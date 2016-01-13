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

Snake.prototype.equal = function (pos1, pos2) {
  return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
};

var Board = function () {
  this.grid = [];
  for (var i = 0; i < 50; i++) {
    this.grid.push(new Array(50));
  }
  this.snake = new Snake();
  this.apple = this.setApple();
};
Board.prototype.setApple = function () {
  return [parseInt(Math.random() * 50),parseInt(Math.random() * 50)];
};

Board.prototype.checkApple = function () {
  if (this.snake.equal(this.snake.head, this.apple)) {
    this.snake.segments.push(this.snake.lastPosition);
    console.log(this.snake.segments);
  }
};

module.exports = Board;
