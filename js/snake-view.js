var Board = require("./snake.js")

var View = function (board, $el) {
  this.board = board;
  this.$el = $el;
};

View.prototype.bindEvents = function () {
  snake = this.board.snake;
    key('left', function () {
      snake.turn("W");
    });

    key('right', function () {
      snake.turn("E");
    });

    key('up', function () {
      snake.turn("N");

    });
    key('down', function () {
      snake.turn("S");
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
  var positions = snake.segments;
  $('li').removeClass().addClass('open');
  apple_pos = board.apple;
  apple_idx = apple_pos[0] * 50 + apple_pos[1] % 50;
  $($('li')[apple_idx]).removeClass().addClass('apple');
  for (var j = 0; j < positions.length; j++) {
    pos = positions[j];
    li_idx = pos[0] * 50 + pos[1] % 50;
    $($('li')[li_idx]).removeClass().addClass('has-snake');
  }
};

module.exports = View;
