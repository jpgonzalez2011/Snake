
(function() {
  window.Snake = window.Snake || {};
  var SnakeBoard = require("./snake.js");
  var SnakeView = require("./snake-view.js");
  var board = new SnakeBoard();
  var rootEl = $('.snake');
  var view = new SnakeView(board, rootEl);

  view.setupGrid();
  var callback = function () {
    view.bindEvents();
    view.board.snake.move();
    view.board.checkApple();
    view.render();
  };
  setInterval(callback, 50);
})();
