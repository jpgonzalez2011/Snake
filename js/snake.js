var Snake = function (properties) {
  this.direction = properties.direction;
  this.segments = properties.segments;
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
  if (this.segments[0][0] > 49){
    this.segments[0][0] = 0;
  } else if (this.segments[0][0] < 0) {
    this.segments[0][0] = 49;
  } else if (this.segments[0][1] > 49) {
    this.segments[0][1] = 0;
  } else if (this.segments[0][1] < 0) {
    this.segments[0][1] = 49;
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
  this.snake = new Snake({direction: "N", segments: [[25,25]]});
  this.enemySnake = new Snake({direction: "S", segments: [[10,10]]});
  this.enemySnake2 = new Snake({direction: "W", segments: [[49,49]]});
  this.enemySnake3 = new Snake({direction: "E", segments: [[49,10]]});
  this.enemySnake4 = new Snake({direction: "N", segments: [[10,49]]});
  this.apple = this.setApple();
  this.score = 0;
  this.bestScore = 0;
};

Board.prototype.reset = function () {
  this.snake = new Snake({direction: "N", segments: [[25,25]]});
  this.enemySnake = new Snake({direction: "S", segments: [[10,10]]});
  this.enemySnake2 = new Snake({direction: "W", segments: [[49,49]]});
  this.enemySnake3 = new Snake({direction: "E", segments: [[49,10]]});
  this.enemySnake4 = new Snake({direction: "N", segments: [[10,49]]});
  this.apple = this.setApple();
  this.score = 0;
};

Board.prototype.setApple = function () {
  return [parseInt(Math.random() * 50),parseInt(Math.random() * 50)];
};

Board.prototype.checkApple = function () {
  if (this.snake.equal(this.snake.head, this.apple)) {
    this.snake.segments.push(this.snake.lastPosition);
    this.enemySnake.segments.push(this.enemySnake.lastPosition);
    this.enemySnake2.segments.push(this.enemySnake2.lastPosition);
    this.enemySnake3.segments.push(this.enemySnake3.lastPosition);
    this.enemySnake4.segments.push(this.enemySnake4.lastPosition);
    this.score += 1;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
    this.apple = this.setApple();
  }
};

Board.prototype.checkGameOver = function () {
  for (var i = 1; i < this.snake.segments.length; i++) {
    if (this.snake.equal(this.snake.head, this.snake.segments[i])) {
      return true;
    }
  }
  for (var j = 0; j < this.snake.segments.length; j++) {
    if (
      this.snake.equal(this.snake.head, this.enemySnake.segments[j]) ||
      this.snake.equal(this.snake.head, this.enemySnake2.segments[j]) ||
      this.snake.equal(this.snake.head, this.enemySnake3.segments[j]) ||
      this.snake.equal(this.snake.head, this.enemySnake4.segments[j])
    ) {
      return true;
    }
  }
  return false;
};

module.exports = Board;
