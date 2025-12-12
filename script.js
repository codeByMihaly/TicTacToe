const gameBoard = (function() {

    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    function getBoard() {
        return board;
    }



    function setMove(position, player) {
        let row = Math.floor(position / 3);
        let col = position % 3;
        if (board[row][col] !== null) {
            return false;
        }

        board[row][col] = player
        return true
        
    };

    function reset() {
        board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    }

    return {getBoard, setMove, reset};
})();

const gameController = (function() {

        let playerPresent = "x";
        let gameOver = false;

        function switchPlayer() {
            if (playerPresent === "x") {
                playerPresent = "0";
                return;
            } else {
                playerPresent = "x";
                return;
            }
        }

        function checkWinner() {

            let game = gameBoard.getBoard();
            let flat = game.flat();
            
            let winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                            [0, 3, 6], [1, 4, 7], [2, 5, 8],
                            [0, 4, 8], [2, 4, 6]];

            for (let pattern of winPatterns) {
                let [a, b, c] = pattern;

                if (flat[a] !== null && flat[a] === flat[b] && flat[a] === flat[c]) {
                    return flat[a];
                }
    
            }

             return null;
        }

        
        function checkDraw() {
                 let game = gameBoard.getBoard().flat();
                 return !game.includes(null);
        };


        function playRound(position) {
            if (gameOver) {
                return;
            }

            let setMoveGame = gameBoard.setMove(position, playerPresent);
            if (setMoveGame === false) {
                return;
            }

            let winner = checkWinner();;
            if (winner !== null) {
                gameOver = true;
                return;
            }

            if (checkDraw()) {
                gameOver = true;
                return;
            }

        switchPlayer();
    }

    return {checkWinner, checkDraw, playRound};
})();