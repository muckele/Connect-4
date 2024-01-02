/*---------Variables--------*/
let board, turn, winner, tie
/*---------Cached Element References------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('message')

/*---------Event Listeners--------*/
document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("connect-four");


/*---------Functions----------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  console.log(board.length)
}

// PseudoCode for Connect Four Unit One Project 

// Initialize the game board:
// Create a 6x7 grid (6 rows, 7 columns)
// Set all grid cells to empty (e.g., 0 represents an empty cell)

// Display the game board:
// Iterate through each row and column
// Display the content of each cell (e.g., "O" for player 1, "X" for player 2, and "." for an empty cell)

// Check for a winning condition:
// Iterate through each row, column, and diagonal
// Check if there are four consecutive discs of the same player
// If yes, declare the player as the winner

// Check for a tie:
// If all cells on the board are filled and no player has won, declare a tie

// Player move:
// Repeat until a winning condition or tie occurs:
// Get the current player's input for the column to drop a disc
// Check if the selected column is not full
// If yes, drop the player's disc in the lowest empty cell in that column
// If no, ask the player to choose another column

// Switch player:
// Toggle between players after each move

// Display the final result:
// Display the final state of the game board
// Display the winner or declare a tie
