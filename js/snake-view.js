var Board = require("./snake.js");

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
  for (var i = 0; i < 400; i++) {
    var pos = [parseInt(i / 20), i % 20];
    $("<li>").addClass("open").data("pos", pos).appendTo($ul);
  }
  this.$el.html($ul);
};

View.prototype.render = function () {
  var board = this.board;
  var snake = board.snake;
  var positions = snake.segments;
  $('li').each(function (i, el) {
    pos = $(el).data("pos");
    for(var j=0; j < positions.length; j++) {
      if (snake.includedInPositions(pos, positions)) {
        $(el).removeClass().addClass('has-snake');
      }
      else if (snake.equal(pos, board.apple)) {
        $(el).removeClass().addClass('apple');
      } else {
        $(el).removeClass().addClass('open');
      }
    }
  });
};

module.exports = View;
