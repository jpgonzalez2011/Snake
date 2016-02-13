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
  var enemySnake4 = this.board.enemySnake4;

    key('left', function () {
      snake.turn("W");
      enemySnake.turn("E");
      enemySnake2.turn("W");
      enemySnake3.turn("E");
      enemySnake4.turn("S");
    });

    key('right', function () {
      snake.turn("E");
      enemySnake.turn("S");
      enemySnake2.turn("E");
      enemySnake3.turn("W");
      enemySnake4.turn("N");
    });

    key('up', function () {
      snake.turn("N");
      enemySnake.turn("W");
      enemySnake2.turn("N");
      enemySnake3.turn("S");
      enemySnake4.turn("E");

    });
    key('down', function () {
      snake.turn("S");
      enemySnake.turn("N");
      enemySnake2.turn("S");
      enemySnake3.turn("N");
      enemySnake4.turn("W");
    });
};


View.prototype.setupGrid = function () {
  this.$el.append("<ul>");
  var $ul = $("<ul>").addClass("snake-grid group");
  $("<figure>").addClass("instructions").html("<h1> Click to Start </h1> <h2> Collect red dots, don't let your head touch other snakes! </h2> <h3> Up Down Left Right Arrows to Turn! </h3>").appendTo($ul);
  $("<figure>").addClass("gameover").html("<h1> Game Over! </h1> <h2> Click to play again! </h2>").hide().appendTo($ul);
  $("<figure>").addClass("scoreboard group").html("<h1 class='current-score'> Curr: " + this.board.score + "</h1>" + "<h1 class='best-score'> Best: " + this.board.bestScore + "</h1>").appendTo($ul);
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
  var enemySnake4 = board.enemySnake4;
  var mySnakePositions = snake.segments
  var enemySnakePositions = enemySnake.segments
                      .concat(enemySnake2.segments)
                      .concat(enemySnake3.segments)
                      .concat(enemySnake4.segments);
  var gamesquares = $('li').removeClass().addClass('open');
  apple_pos = board.apple;
  apple_idx = apple_pos[0] * 50 + apple_pos[1] % 50;
  $(gamesquares[apple_idx]).removeClass().addClass('apple');
  for (var j = 0; j < mySnakePositions.length; j++) {
    pos = mySnakePositions[j];
    li_idx = pos[0] * 50 + pos[1] % 50;
    if (j === 0) {
      $(gamesquares[li_idx]).removeClass().addClass('own-snake-head')
    } else {
      $(gamesquares[li_idx]).removeClass().addClass('own-snake');
    }
  }
  for (var k = 0; k < enemySnakePositions.length; k++) {
    pos = enemySnakePositions[k];
    li_idx = pos[0] * 50 + pos[1] % 50;
    $(gamesquares[li_idx]).removeClass().addClass('has-snake');
  }
  if (this.board.score > this.board.bestScore) {
    this.board.bestScore = this.board.score;
  }
  $(".scoreboard").html("<h1 class='current-score'> Curr: " + this.board.score + "</h1>" + "<h1 class='best-score'> Best: " + this.board.bestScore + "</h1>");
};

module.exports = View;
