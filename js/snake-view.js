var Board = require("./snake.js")

var View = function (board, $el) {
  this.board = board;
  this.$el = $el;
};

View.prototype.bindEvents = function () {
  var snake = this.board.snake;
  var enemySnake = this.board.enemySnake;
  var enemySnake2 = this.board.enemySnake2;
  var enemySnake3 = this.board.enemySnake3;

    key('left', function () {
      snake.turn("W");
      setTimeout(50, enemySnake.turn("E"));
      setTimeout(50, enemySnake2.turn("W"));
      setTimeout(50, enemySnake3.turn("E"));
    });

    key('right', function () {
      snake.turn("E");
      setTimeout(50, enemySnake.turn("S"));
      setTimeout(50, enemySnake2.turn("E"));
      setTimeout(50, enemySnake3.turn("W"));
    });

    key('up', function () {
      snake.turn("N");
      setTimeout(50, enemySnake.turn("W"));
      setTimeout(50, enemySnake2.turn("N"));
      setTimeout(50, enemySnake3.turn("S"));

    });
    key('down', function () {
      snake.turn("S");
      setTimeout(50, enemySnake.turn("N"));
      setTimeout(50, enemySnake2.turn("S"));
      setTimeout(50, enemySnake3.turn("N"));
    });
};


View.prototype.setupGrid = function () {
  this.$el.append("<ul>");
  var $ul = $("<ul>").addClass("snake-grid group");
  for (var i = 0; i < 2500; i++) {
    var pos = [parseInt(i / 50), i % 50];
    $("<li>").addClass("open").data("pos", pos).appendTo($ul);
  }
  this.$el.html($ul);
};

View.prototype.render = function () {
  var board = this.board;
  var snake = board.snake;
  var enemySnake = board.enemySnake;
  var enemySnake2 = board.enemySnake2;
  var enemySnake3 = board.enemySnake3;
  var mySnakePositions = snake.segments
  var enemySnakePositions = enemySnake.segments.concat(enemySnake2.segments).concat(enemySnake3.segments);
  var gamesquares = $('li').removeClass().addClass('open');
  apple_pos = board.apple;
  apple_idx = apple_pos[0] * 50 + apple_pos[1] % 50;
  $(gamesquares[apple_idx]).removeClass().addClass('apple');
  for (var j = 0; j < mySnakePositions.length; j++) {
    pos = mySnakePositions[j];
    li_idx = pos[0] * 50 + pos[1] % 50;
    $(gamesquares[li_idx]).removeClass().addClass('own-snake');
  }
  for (var k = 0; k < enemySnakePositions.length; k++) {
    pos = enemySnakePositions[k];
    li_idx = pos[0] * 50 + pos[1] % 50;
    $(gamesquares[li_idx]).removeClass().addClass('has-snake');
  }
};

module.exports = View;
