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
    handleClick(idx)
  })
})
resetBtn.addEventListener('click', init)
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
  board = Array(42).fill(null) 
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
      cellEls[idx].style.backgroundColor = 'red'
    } if (boardVal === -1) {
      cellEls[idx].style.backgroundColor = 'yellow'
    } if (boardVal === null) {
      cellEls[idx].style.backgroundColor = ''
    }
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'red' : 'yellow'}'s turn!`
  } else if (!winner && tie) {
    messageEl.textContent = "Draw, play again!"
  } else {
    messageEl.textContent = `Player ${winner === 1 ? 'red' : 'yellow'} wins!`
  }
}

function handleClick(idx) {
  if (!winner && !tie) {
    const column = idx % 7
    let row = findLowestEmptyRow(column)
    if (row !== -1) {
      board[row * 7 + column] = turn
      checkForWinner(turn)
      checkForTie()
      turn = (turn === 1) ? -1 : 1
      cellEls.forEach(cellEl => {
        cellEl.classList.remove('HoverClass1', 'HoverClass2')
      })
      const hoverClass = (turn == 1) ? 'HoverClass1' : 'HoverClass2'
      cellEls.forEach(cellEl => cellEl.classList.add(hoverClass))
      render()
    }
  }
}


function findLowestEmptyRow(column) {
  for (let row = 6; row >= 0; row--) {
    if (board[row * 7 + column] === null) {
      return row
    }
  }
  return -1
}

function checkForWinner(player) {
  for (let combo of winningCombos) {
    let count = 0
    for (let position of combo) {
      if (board[position] === player) {
        count++
      }
    }
    if (count === 4) {
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
// Display the content of each cell (e.g., "red" for player 1, "yellow" for player 2, and null for an empty cell)

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
