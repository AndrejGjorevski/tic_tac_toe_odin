const displayController = (function () {
    const boardContainer = document.getElementById("gameboard");

    function render(board, currentPlayer) {
        boardContainer.innerHTML = "";
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                cellDiv.innerText = board[i][j];
                boardContainer.appendChild(cellDiv);
                cellDiv.addEventListener("click", handleClick, { once: true })
            }
        }

        const currentPlayerDisplay = document.getElementById("currentPlayerName");
        currentPlayerDisplay.innerHTML = "";
        currentPlayerDisplay.innerText = currentPlayer.name;
    }

    function handleClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;
        TicTacToe.playRound(Number(row), Number(col))
    }

    const closeBtn = document.getElementById("close-btn");
    const dialog = document.getElementById("dialog");
    const qoute = document.getElementById("qoute");

    closeBtn.addEventListener("click", function () {
        dialog.close();
    })

    function renderWinner(player) {
        qoute.innerText = player.name + " wins!";
        dialog.showModal();
    }

    function renderDraw() {
        qoute.innerText = "Draw";
        dialog.showModal();
    }

    return { render, renderWinner, renderDraw }

})();

const TicTacToe = (function () {
    const gameBoard = (function () {
        const generateBoard = () => [["", "", ""], ["", "", ""], ["", "", ""]];
        const currentBoard = generateBoard();
        const resetBoard = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    currentBoard[i][j] = "";
                }
            }
        }
        return { currentBoard, resetBoard }
    })();

    function createPlayer(name, symbol) {
        const addMoveToBoard = (posX, posY) => {
            if (gameBoard.currentBoard[posX][posY] === "") {
                gameBoard.currentBoard[posX][posY] = symbol;
            }
        }
        return { name, symbol, addMoveToBoard }
    }

    let player1 = null;
    let player2 = null;
    let currentPlayer = null
    let gameStarted = false;
    let isGameOver = false;

    function startGame(name1, name2) {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
        currentPlayer = player1;
        gameBoard.resetBoard();
        displayController.render(gameBoard.currentBoard, currentPlayer)
        gameStarted = true;
        isGameOver = false;
    }

    function playRound(posX, posY) {
        if (!gameStarted || isGameOver) {
            return;
        }

        currentPlayer.addMoveToBoard(posX, posY);

        if (checkWin(currentPlayer.symbol)) {
            displayController.renderWinner(currentPlayer);
            isGameOver = true;
            displayController.render(gameBoard.currentBoard, currentPlayer);
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayController.render(gameBoard.currentBoard, currentPlayer)

        if (checkDraw()) {
            displayController.renderDraw();
            isGameOver = true;
            displayController.render(gameBoard.currentBoard, currentPlayer)
            return;
        }
    }

    function checkWin(symbol) {
        const board = gameBoard.currentBoard;

        for (let i = 0; i < 3; i++) {
            if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true;
            if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true;
        }

        if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
        if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;

        return false;
    }

    function checkDraw() {
        const board = gameBoard.currentBoard;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    return false;
                }
            }
        }

        return true;
    }

    function resetGame() {
        if (!player1 || !player2) {
            console.log("No players have been set you start the game first");
            return;
        }

        gameBoard.resetBoard();
        currentPlayer = player1;
        displayController.render(gameBoard.currentBoard, currentPlayer)
        gameStarted = true;
        isGameOver = false;
    }

    return { startGame, playRound, resetGame }
})();

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

startButton.addEventListener("click", function () {
    const playerOneName = document.getElementById("playerOne").value;
    const playerTwoName = document.getElementById("playerTwo").value;
    const menuDiv = document.getElementById("menu");
    restartButton.classList.remove("hide");
    menuDiv.style.display = "none";

    TicTacToe.startGame(playerOneName, playerTwoName);
})

restartButton.addEventListener("click", function () {
    TicTacToe.resetGame();
})