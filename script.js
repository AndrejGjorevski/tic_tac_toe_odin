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

    const player1 = createPlayer("Andrej", "X");
    const player2 = createPlayer("Kristina", "O");

    let currentPlayer = player1;

    function playRound(posX, posY) {
        currentPlayer.addMoveToBoard(posX, posY);

        if(checkWin(currentPlayer.symbol)) {
            console.log(`${currentPlayer.name} wins!`);
            return;
        }

        if (checkDraw()) {
            console.log("It's a draw");
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
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
        let flag = false;
        const board = gameBoard.currentBoard;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    flag = false;
                } else {
                    flag = true;
                }
            }
        }

        return flag;
    }

    function resetGame() {
        gameBoard.resetBoard();
        currentPlayer = player1;
    }

    return {createPlayer, playRound, resetGame}
})();

