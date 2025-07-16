const gameBoard = (function() {
    const generateBoard = () => [[], [], []];
    const currentBoard = generateBoard();
    const resetBoard = generateBoard();
    return {currentBoard, resetBoard}
})();

function createPlayer(name) {
    const addMoveToBoard = (character, posX, posY) => gameBoard.currentBoard[posX][posY] = character;
    return {name, addMoveToBoard}
}