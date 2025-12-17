// Game Logic

/* --------Board--------*/
const gameBoard = (function() {


    // Board itself
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


/* --------Game logic about how to win, who comes--------*/
const gameController = (function() {

        let playerPresent = "x";
        let gameOver = false;

        // Which player comes next

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

        // What patters is winnable

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

        // If its a draw
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

       
       function resetRound() {
          gameBoard.reset();
          gameOver = false;
          playerPresent = "x"     
        }

    

    return {checkWinner, checkDraw, playRound, getCurrentPlayer, resetRound};
})();


                    /* --------UI--------*/
const displayController = (function(){
      let gameCells = document.querySelectorAll(".gameCells");
      let restartRoundBtn = document.getElementById("btnNewRound");
      let restartGameBtn = document.getElementById("btnRestartGame");
      let score = document.getElementById("score");
      let playerNameChange1 = document.getElementById("player1");
      let playerNameChange2 = document.getElementById("player2");
      let player1 = document.getElementById("player1Score");
      let player2 = document.getElementById("player2Score");
      let player1Score = 0;
      let player2Score = 0;
      let roundOver = false;
      let inputPlayer1 = document.getElementById("name1");
      let inputPlayer2 = document.getElementById("name2");

      gameCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          if (roundOver) return;

          // The already selected cells

          const board = gameBoard.getBoard().flat();
          if(board[index] !== null) {
            score.textContent = `This cell is already occupied by ${board[index].toUpperCase()}! Try another.`
            return;
          }
         gameController.playRound(index);
         updateDisplay();

        })
      }) 
      
      // Name settings
      const form = document.querySelector('form');

          function nameChange (e) {
          e.preventDefault();
          playerNameChange1.textContent = inputPlayer1.value + ":";
          playerNameChange2.textContent = inputPlayer2.value + ":";
          inputPlayer1.value = "";
          inputPlayer2.value = "";
      }

      form.addEventListener("submit", nameChange);


      function updateDisplay() {
      
       const board = gameBoard.getBoard().flat();
        gameCells.forEach((cell, i) => {
          cell.textContent = board[i] ? board[i].toUpperCase(): ""
        })
        const winner = gameController.checkWinner();
    
        // Score

        if(winner === "x") {
          player1Score++;
          score.textContent = `Winner is ${playerNameChange1.textContent.replace(/:$/, "")}`;
          player1.textContent = player1Score;
          roundOver = true;
        } else if (winner === "0") {
          player2Score++;
          score.textContent = `Winner is ${playerNameChange2.textContent.replace(/:$/, "")}`;
          player2.textContent = player2Score;
          roundOver = true;
        } else if (gameController.checkDraw()) {
          score.textContent = "It's a draw!";
          roundOver = true;
        }
      }

        // Restart ROUND!!!

        function restartRound() {
          gameController.resetRound();
          updateDisplay();
          score.textContent = "New round has started!"
          roundOver = false;
        }

         // Restart the entire GAME!!!

        function restartGame() {
          gameController.resetRound();
          player1Score = 0;
          player2Score = 0;
          player1.textContent = player1Score;
          player2.textContent = player2Score;
          playerNameChange1.textContent = "Player1:"
          playerNameChange2.textContent = "Player2:"
          updateDisplay();
          score.textContent = "New game has started!"     
          roundOver = false;   
        }

      restartRoundBtn.addEventListener("click", restartRound);
      restartGameBtn.addEventListener("click", restartGame);

    updateDisplay();
})();