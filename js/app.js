// /*-------------------Constants-----------------*/
const winningCombos = [
  // Horizontal combinations
  [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5],
  [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11],
  [12, 13, 14, 15], [13, 14, 15, 16], [14, 15, 16, 17],
  [18, 19, 20, 21], [19, 20, 21, 22], [20, 21, 22, 23],
  [24, 25, 26, 27], [25, 26, 27, 28], [26, 27, 28, 29],
  [30, 31, 32, 33], [31, 32, 33, 34], [32, 33, 34, 35],
  [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

  // Vertical combinations
  [0, 6, 12, 18], [1, 7, 13, 19], [2, 8, 14, 20],
  [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23],
  [6, 12, 18, 24], [7, 13, 19, 25], [8, 14, 20, 26],
  [9, 15, 21, 27], [10, 16, 22, 28], [11, 17, 23, 29],
  [12, 18, 24, 30], [13, 19, 25, 31], [14, 20, 26, 32],
  [15, 21, 27, 33], [16, 22, 28, 34], [17, 23, 29, 35],
  [18, 24, 30, 36], [19, 25, 31, 37], [20, 26, 32, 38],
  [21, 27, 33, 39], [22, 28, 34, 40], [23, 29, 35, 41],

  // Diagonal combinations
  [0, 7, 14, 21], [1, 8, 15, 22], [2, 9, 16, 23],
  [6, 13, 20, 27], [7, 14, 21, 28], [8, 15, 22, 29],
  [12, 19, 26, 33], [13, 20, 27, 34], [14, 21, 28, 35],
  [18, 25, 32, 39], [19, 26, 33, 40], [20, 27, 34, 41],
  
  // Other diagonal combinations
  [3, 8, 13, 18], [4, 9, 14, 19], [5, 10, 15, 20],
  [9, 14, 19, 24], [10, 15, 20, 25], [11, 16, 21, 26],
  [15, 20, 25, 30], [16, 21, 26, 31], [17, 22, 27, 32],
  [21, 26, 31, 36], [22, 27, 32, 37], [23, 28, 33, 38]
]



/*---------Variables--------*/
let board, turn, winner, tie
/*---------Cached Element References------*/
const cellEls = document.querySelectorAll('.cell')
const messageEl = document.querySelector('#message')
const resetBtn = document.getElementById('reset-button')
const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")


/*---------Event Listeners--------*/
cellEls.forEach(function (cellEl, idx) {
  cellEl.addEventListener('click', function () {
    handleClick(idx);
  })
})
resetBtn.addEventListener('click', init);
lightDarkBtn.addEventListener('click', toggleLightDark)


/*---------Functions----------*/
init()
checkDarkPref()

function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

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
      cellEls[idx].style.backgroundColor = 'yellow'
    } if (boardVal === null) {
      cellEls[idx].style.backgroundColor = ''
    }
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'blue' : 'yellow'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "Draw, play again!"
  } else {
    messageEl.textContent = `Player ${winner === 1 ? 'blue' : 'yellow'} wins!`
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
  for (let row = 6; row > 0; row--) {
    if (board[row * 6 + idx % 6] === null) {
      return row
    }
  }
  return -1
}

// function checkForWinningCombos() {
//   for (let combo of winningCombos) {
//     let blueCount = 0
//     let yellowCount = 0

//     for (let position of combo) {
//       const [row, col] = position
//       const cellValue = board[row * 7 + col]

//       if (cellValue === 1) {
//         blueCount++
//       } else if (cellValue === -1) {
//         yellowCount++
//       }

//       if (blueCount === 4) {
//         return 1;
//       } else if (yellowCount === 4) {
//         return -1;
//       }
//     }
//   }
//   return 0;
// }




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
// Display the content of each cell (e.g., "yellow" for player 1, "blue" for player 2, and null for an empty cell)

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
