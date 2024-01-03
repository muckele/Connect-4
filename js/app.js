/*-------------------Constants-----------------*/
const winningCombos = [
  // Vertical wins
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  [[0, 1], [1, 1], [2, 1], [3, 1]],
  [[0, 2], [1, 2], [2, 2], [3, 2]],
  [[0, 3], [1, 3], [2, 3], [3, 3]],
  [[1, 0], [2, 0], [3, 0], [4, 0]],
  [[1, 1], [2, 1], [3, 1], [4, 1]],
  [[1, 2], [2, 2], [3, 2], [4, 2]],
  [[1, 3], [2, 3], [3, 3], [4, 3]],
  [[2, 0], [3, 0], [4, 0], [5, 0]],
  [[2, 1], [3, 1], [4, 1], [5, 1]],
  [[2, 2], [3, 2], [4, 2], [5, 2]],
  [[2, 3], [3, 3], [4, 3], [5, 3]],
  [[3, 0], [4, 0], [5, 0], [6, 0]],
  [[3, 1], [4, 1], [5, 1], [6, 1]],
  [[3, 2], [4, 2], [5, 2], [6, 2]],
  [[3, 3], [4, 3], [5, 3], [6, 3]],

  // Horizontal wins
  [[0, 0], [0, 1], [0, 2], [0, 3]],
  [[1, 0], [1, 1], [1, 2], [1, 3]],
  [[2, 0], [2, 1], [2, 2], [2, 3]],
  [[3, 0], [3, 1], [3, 2], [3, 3]],
  [[4, 0], [4, 1], [4, 2], [4, 3]],
  [[5, 0], [5, 1], [5, 2], [5, 3]],
  [[6, 0], [6, 1], [6, 2], [6, 3]],

  // Diagonal wins (ascending)
  [[0, 0], [1, 1], [2, 2], [3, 3]],
  [[1, 0], [2, 1], [3, 2], [4, 3]],
  [[2, 0], [3, 1], [4, 2], [5, 3]],
  [[3, 0], [4, 1], [5, 2], [6, 3]],
  [[0, 1], [1, 2], [2, 3], [3, 4]],
  [[1, 1], [2, 2], [3, 3], [4, 4]],
  [[2, 1], [3, 2], [4, 3], [5, 4]],
  [[3, 1], [4, 2], [5, 3], [6, 4]],
  [[0, 2], [1, 3], [2, 4], [3, 5]],
  [[1, 2], [2, 3], [3, 4], [4, 5]],
  [[2, 2], [3, 3], [4, 4], [5, 5]],
  [[3, 2], [4, 3], [5, 4], [6, 5]],

  // Diagonal wins (descending)
  [[0, 3], [1, 2], [2, 1], [3, 0]],
  [[1, 3], [2, 2], [3, 1], [4, 0]],
  [[2, 3], [3, 2], [4, 1], [5, 0]],
  [[3, 3], [4, 2], [5, 1], [6, 0]],
  [[0, 4], [1, 3], [2, 2], [3, 1]],
  [[1, 4], [2, 3], [3, 2], [4, 1]],
  [[2, 4], [3, 3], [4, 2], [5, 1]],
  [[3, 4], [4, 3], [5, 2], [6, 1]],
  [[0, 5], [1, 4], [2, 3], [3, 2]],
  [[1, 5], [2, 4], [3, 3], [4, 2]],
  [[2, 5], [3, 4], [4, 3], [5, 2]],
  [[3, 5], [4, 4], [5, 3], [6, 2]],
]
console.log(winningCombos.length)

/*---------Variables--------*/
let board, turn, winner, tie
/*---------Cached Element References------*/
const cellEls = document.querySelectorAll('.cell')
const messageEl = document.querySelector('#message')
const resetBtn = document.getElementById('reset-button')

/*---------Event Listeners--------*/
cellEls.forEach(function (cellEl, idx) {
  cellEl.addEventListener('click', function () {
    handleClick(idx);
  })
})
resetBtn.addEventListener('click', init);


/*---------Functions----------*/
init()

function init() {
board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}

function render() {
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach((boardVal, idx) => {
    if (boardVal === 1) {
      cellEls[idx].style.backgroundColor = 'blue'
    } if (boardVal === -1) {
      cellEls[idx].style.backgroundColor = 'red'
    } if (boardVal === null) {
      cellEls[idx].style.backgroundColor = ''
    }
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'blue' : 'red'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "Draw, play again!"
  } else {
    messageEl.textContent = `Player ${winner === 1 ? 'blue' : 'red'} wins!`
  }
}

function handleClick(idx) {
  if (board[idx] === null && !winner && !tie) {
    let row = findLowestEmptyRow(idx)
    if (row !== -1) {
      board[row * 6 + idx % 6] = turn
      checkForWinner(turn)
      checkForTie()
      turn = turn === 1 ? -1 : 1
      render()
    }
  }
}

function findLowestEmptyRow(idx) {
  for (let row = 5; row >= 0; row--) {
    if (board[row * 6 + idx % 6] === null) {
      return row
    }
  }
  return -1
  console.log(idx)
}


function checkForWinner(player) {
  for (let combo of winningCombos) {
    let count = 0
    for (let position of combo) {
      if (board[position[0] + position[1] * 7] === player) {
        count++
      }
    } if (count === 4) {
      winner = player
      render()
      return
    }
  }
}

function checkForTie() {
  if (!board.includes(null) && !winner) {
    tie = true
    render()
  }
}





// PseudoCode for Connect Four Unit One Project 

// Initialize the game board:
// Create a 6x7 grid (6 rows, 7 rows)
// Set all grid cells to empty (e.g., null represents an empty cell)

// Display the game board:
// Iterate through each row and row
// Display the content of each cell (e.g., "red" for player 1, "blue" for player 2, and null for an empty cell)

// Check for a winning condition:
// Iterate through each row, row, and diagonal
// Check if there are four consecutive discs of the same player
// If yes, declare the player as the winner

// Check for a tie:
// If all cells on the board are filled and no player has won, declare a tie

// Player move:
// Repeat until a winning condition or tie occurs:
// Get the current player's input for the row to drop a disc
// Check if the selected row is not full
// If yes, drop the player's disc in the lowest empty cell in that row
// If no, ask the player to choose another row

// Switch player:
// Toggle between players after each move

// Display the final result:
// Display the final state of the game board
// Display the winner or declare a tie
