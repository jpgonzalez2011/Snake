/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	(function() {
	  window.Snake = window.Snake || {};
	  var SnakeBoard = __webpack_require__(1);
	  var SnakeView = __webpack_require__(2);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	
	Snake.prototype.includedInPositions = function (pos1, positions) {
	  for (var i = 0; i < positions.length; i++){
	    var random_snake = new Snake();
	    if (random_snake.equal(pos1, positions[i])) {
	      return true;
	    }
	  }
	  return false;
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
	    this.apple = this.setApple();
	  }
	};
	
	Board.prototype.checkGameOver = function () {
	  for (var i = 1; i < this.snake.segments.length; i++) {
	    if (this.snake.equal(this.snake.head, this.snake.segments[i])) {
	      return true;
	    }
	  }
	  for (i = 0; i < this.snake.segments.length; i++) {
	      if (this.snake.equal(this.snake.head, this.enemySnake.segments[i])) {
	      return true;
	    } else if (this.snake.equal(this.snake.head, this.enemySnake2.segments[i])) {
	      return true;
	    } else if (this.snake.equal(this.snake.head, this.enemySnake3.segments[i])) {
	      return true;
	    } else if (this.snake.equal(this.snake.head, this.enemySnake4.segments[i])) {
	      return true;
	    }
	  }
	  return false;
	};
	
	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1)
	
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
	};
	
	module.exports = View;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map