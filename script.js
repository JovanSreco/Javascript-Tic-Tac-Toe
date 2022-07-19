const X_TURN = "x-turn"
const CIRCLE_TURN = "circle-turn"
const CELL_X = "board__cell--x"
const CELL_CIRCLE = "board__cell--circle"
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const board = document.querySelector("[data-board]")
const cellElements = document.querySelectorAll("[data-cell]")
const newGameElement = document.querySelector("[data-new-game]")
const newGameBtn = document.querySelector("[data-new-game-btn]")
const newGameMessage = document.querySelector("[data-new-game-message]")
let xTurn = true

newGame()

newGameBtn.addEventListener("click", newGame)
// Reset everything and add event listeners for new game
function newGame () {
    xTurn = true;
    board.classList.remove(X_TURN)
    board.classList.remove(CIRCLE_TURN)
    newGameMessage.classList.remove(X_TURN)
    newGameMessage.classList.remove(CIRCLE_TURN)
    newGameMessage.textContent = ""
    // Add eventlistener to every button and they can fire once. Event delegation here would not be usefull.
    cellElements.forEach(cell => {
        cell.classList.remove(CELL_X)
        cell.classList.remove(CELL_CIRCLE)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover();
}


function handleClick(e) {
    const cell = e.target
    // String of the current class name that placed the mark
    const currentClass = xTurn ? CELL_X : CELL_CIRCLE
    //Give class board__cell--x or board__cell--circle to cells. Check whose turn it is.
    placeClass(cell)
    //Check for winers and losers or for a draw
    if(checkWin(currentClass)) {
        endGame(currentClass)
    } else if(checkDraw()) {
        endGame()
    } else {
        //Switch turns and set board class for hover effect
        switchTurns()
        setBoardHover()
    }
}

function placeClass(cell, currentClass) {
    xTurn ? cell.classList.add(CELL_X) : cell.classList.add(CELL_CIRCLE)
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function checkDraw() {
    return [...cellElements].every(element => {
        return (element.classList.contains(CELL_X) || element.classList.contains(CELL_CIRCLE)) ? true : false
    })
}

function endGame(currentClass) {
    // If there is a winer do something otherwise it's a draw
    if(currentClass) {
        xTurn ? newGameMessage.classList.add(X_TURN) : newGameMessage.classList.add(CIRCLE_TURN)
        newGameMessage.textContent = `${xTurn ? "X's" : "O's"} WINS!`
    } else {
        newGameMessage.textContent = 'DRAW!'
    }
    removeListenersHover()
}

function switchTurns() {
    xTurn = !xTurn
}

function setBoardHover() {
    if(xTurn) {
        board.classList.add(X_TURN)
        board.classList.remove(CIRCLE_TURN)
    } else {
        board.classList.remove(X_TURN)
        board.classList.add(CIRCLE_TURN)
    }
}

function removeListenersHover() {
    cellElements.forEach(cell => {
        board.classList.remove(X_TURN)
        board.classList.remove(CIRCLE_TURN)
        cell.removeEventListener('click', handleClick)
    })
}