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

        function getCurrentPlayer() {
          return playerPresent;
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

       
       function resetGame() {
          gameBoard.reset();
          gameOver = false;
          playerPresent = "x"
      
      
        }

    return {checkWinner, checkDraw, playRound, getCurrentPlayer, resetGame};
})();

const displayController = (function(){
      let gameCells = document.querySelectorAll(".gameCells");
      let restartRoundBtn = document.getElementById("btnNewRound");
      let restartGameBtn = document.getElementById("btnRestartGame");
      let score = document.getElementById("score");
      let player1 = document.getElementById("player1");
      let player2 = document.getElementById("player2");

      gameCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          const board = gameBoard.getBoard().flat();
          if(board[index] !== null) {
            score.textContent = `This cell is already occupied by ${board[index].toUpperCase()}! Try another.`
            return;
          }
         gameController.playRound(index);
         updateDisplay();

        })
      }) 
      

      function updateDisplay() {
      
       const board = gameBoard.getBoard().flat();
        gameCells.forEach((cell, i) => {
          cell.textContent = board[i] ? board[i].toUpperCase(): ""
        })
        const winner = gameController.checkWinner();
        for (let scoreNum = 0; scoreNum < 5; scoreNum++) {
        if(winner === "x") {
        score.textContent = `Winner is Player1`;
        scoreNum++
        player1.textContent = "Player1: " + scoreNum;
        return;
        
       
        } else if (winner === "0") {
          score.textContent = "Winner is Player2"
        } else if (gameController.checkDraw()) {
          score.textContent = "It's a draw!";
        }
        }
      }
        function restartRound() {
          gameController.resetGame();
          updateDisplay();
          score.textContent = "New round has started!"
        }



      restartRoundBtn.addEventListener("click", restartRound);

    updateDisplay();
})();