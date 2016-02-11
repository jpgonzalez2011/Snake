
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = require("./snake.js");
  var SnakeView = require("./snake-view.js");
  var board = new SnakeBoard();
  var gameplay;
  var rootEl = $('.snake').on("click", function startGame (e) {
    gameplay = setInterval(callback, 60);
    $(e.currentTarget).off("click")
  }.bind(this));
  var view = new SnakeView(board, rootEl);

  view.setupGrid();
  var callback = function () {
    view.bindEvents();
    view.board.snake.move();
    view.board.enemySnake.move();
    view.board.enemySnake2.move();
    view.board.enemySnake3.move();
    view.board.checkApple();
    view.render();
    if (view.board.checkGameOver()) {
      clearInterval(gameplay);
      gameplay = 0;
    }
  };
})();
