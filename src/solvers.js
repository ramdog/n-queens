/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  var addedPieces = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if(!board.hasAnyRooksConflicts()) {
        addedPieces++;
        if (addedPieces === n) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
          return board.rows();
        }
      } else {
        board.togglePiece(i, j);
      }
    }
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 1;
  }

  var solutionCount = 0;

  // everytime we recurse, we make a new board
  // we use the previous board as a foundation for the new board
  //
  //  our base case is when there are n elements toggled (keep in a count var) & no conflicts &&
  //     a board that has no moves
  //
  //  iterate through a loop. given a board with a current position we need to iterate and recurse
  //  remaining square count - current position
  var helper = function(position, board, currentCount) {
    var currentPosition = position;
    var currentBoard = board;
    if (currentCount === n) {
      solutionCount++;
      console.log("solution board: ", currentBoard.rows());
      return;
    } else if (currentPosition === Math.pow(n, 2)) {
      // >>>> DO THIS FROM SPEC Runner HTML: countNRookSolutions(2); and inspect
      // dead board not looking as expected
      console.log("dead board: ", currentBoard.rows());
      return;
    }

    for (var nextPosition = currentPosition; nextPosition < Math.pow(n, 2); nextPosition++) {
      // WAS: var temp = [[]]; shouldn't make a difference
      var temp = [];
      for (var i = 0; i < n; i++) {
        temp[i] = currentBoard.rows()[i].slice();
      }
      var currentBoardCopy = new Board(temp);

      var x = Math.floor(currentPosition / n);
      var y = currentPosition % n;
      currentBoardCopy.togglePiece(x, y);
      if (!currentBoardCopy.hasAnyRooksConflicts()) {
        var count = currentCount + 1;
        var nextPositionInRecursion = nextPosition + 1;
        helper(nextPositionInRecursion, currentBoardCopy, count);
      }
    }
  };

  var board = new Board({n: n});
  helper(0, board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
