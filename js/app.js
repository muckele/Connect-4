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
  board = new Array(42).fill(null) 
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
  const winningCombos = getWinningCombos()
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

function getWinningCombos() {
  const combos = []
  // Horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      combos.push([row * 7 + col, row * 7 + col + 1, row * 7 + col + 2, row * 7 + col + 3])
    }
  }
  // Vertical
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      combos.push([row * 7 + col, (row + 1) * 7 + col, (row + 2) * 7 + col, (row + 3) * 7 + col])
    }
  }
  // Diagonal
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      combos.push([row * 7 + col, (row + 1) * 7 + col + 1, (row + 2) * 7 + col + 2, (row + 3) * 7 + col + 3])
      combos.push([row * 7 + col + 3, (row + 1) * 7 + col + 2, (row + 2) * 7 + col + 1, (row + 3) * 7 + col])
    }
  }
  return combos
}






