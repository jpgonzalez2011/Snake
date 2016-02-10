
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = require("./snake.js");
  var SnakeView = require("./snake-view.js");
  var board = new SnakeBoard();
  var gameplay;
  var rootEl = $('.snake').on("click", function startGame (e) {
    gameplay = setInterval(callback, 50);
    $(e.currentTarget).off("click")
  }.bind(this));
  var view = new SnakeView(board, rootEl);

  view.setupGrid();
  var callback = function () {
    view.bindEvents();
    view.board.snake.move();
    view.board.checkApple();
    view.render();
    if (view.board.checkGameOver()) {
      clearInterval(gameplay);
      gameplay = 0;
    }
  };
})();
