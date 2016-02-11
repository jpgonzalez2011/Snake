
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = require("./snake.js");
  var SnakeView = require("./snake-view.js");
  var gameplay;
  var board = new SnakeBoard();
  var view = new SnakeView(board, rootEl);
  var rootEl = $('.snake').on("click", startGame);
  view.setupGrid();


  var startGame = function (e) {
    $(e.currentTarget).removeClass("instructions");
    gameplay = setInterval(callback, 60);
    $(e.currentTarget).off("click")
  };

  var callback = function () {
    view.bindEvents();
    view.board.snake.move();
    view.board.enemySnake.move();
    view.board.enemySnake2.move();
    view.board.enemySnake3.move();
    view.board.enemySnake4.move();
    view.board.checkApple();
    view.render();
    if (view.board.checkGameOver()) {
      clearInterval(gameplay);
      $('.snake').on("click", startGame);
    }
  };
})();
