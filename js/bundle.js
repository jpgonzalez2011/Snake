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
	  var board = new SnakeBoard();
	  var rootEl = $('.snake');
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
	  var gameplay = setInterval(callback, 100);
	})();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Snake = function () {
	  this.direction = "N";
	  this.segments = [[10,10]];
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
	  this.snake = new Snake();
	  this.apple = this.setApple();
	};
	
	Board.prototype.setApple = function () {
	  return [parseInt(Math.random() * 50),parseInt(Math.random() * 50)];
	};
	
	Board.prototype.checkApple = function () {
	  if (this.snake.equal(this.snake.head, this.apple)) {
	    this.snake.segments.push(this.snake.lastPosition);
	    this.apple = this.setApple();
	  }
	};
	
	Board.prototype.checkGameOver = function () {
	  for (var i = 1; i < this.snake.segments.length; i++) {
	    if (this.snake.equal(this.snake.head, this.snake.segments[i])) {
	      return true
	    }
	  }
	  return false
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
	  debugger
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map