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
  var solutionCount = 0;

  // pass in board, current row
  // loop through columns in current row
  //   toggle col[i]
  //   if board valid
  //     go to next row and start again (recurse)
  //   otherwise
  //     untoggle, continue loop (i.e. go to next col)

  // base case: when current row is off board
  //

  var findSolutions = function(board, currentRow) {

    if (currentRow === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(currentRow, col);
      if (!board.hasAnyRooksConflicts()) {
        findSolutions(board, currentRow+1);
      }
      board.togglePiece(currentRow, col);
    }
  };

  var board = new Board({n: n});
  findSolutions(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var findSolutions = function(board, currentRow) {

    if (currentRow === n) {
      var solution = board.rows();
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return solution;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(currentRow, col);
      if (!board.hasAnyQueensConflicts()) {
        findSolutions(board, currentRow+1);
      }
      board.togglePiece(currentRow, col);
    }
  };

  var board = new Board({n: n});
  findSolutions(board, 0);

  // if not found in recursion case
  var output = new Board({n: n});
  return output.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  // pass in board, current row
  // loop through columns in current row
  //   toggle col[i]
  //   if board valid
  //     go to next row and start again (recurse)
  //
  //   untoggle, continue loop (i.e. go to next col)

  // base case: when current row is off board
  //

  var findSolutions = function(board, currentRow) {

    if (currentRow === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      board.togglePiece(currentRow, col);
      if (!board.hasAnyQueensConflicts()) {
        findSolutions(board, currentRow+1);
      }
      board.togglePiece(currentRow, col);
    }
  };

  var board = new Board({n: n});
  findSolutions(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
