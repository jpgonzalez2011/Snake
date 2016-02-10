
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = require("./snake.js");
  var SnakeView = require("./snake-view.js");
  var board = new SnakeBoard();
  var rootEl = $('.snake').click(function gameplay () {
    setInterval(callback, 100);
  });
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
  // var gameplay = setInterval(callback, 100);
})();
