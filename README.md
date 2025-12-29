**Tic Tac Toe Game 🎮**

**Overview**
- A simple Tic Tac Toe game built with JavaScript, HTML, and CSS.
- Players can enter their names, play multiple rounds, and keep track of scores. The game supports restarting a single round or resetting the entire game.

**LIVE DEMO:**  https://codebymihaly.github.io/TicTacToe/

**Features**
- Two‑player Tic Tac Toe (X vs O).

- Custom player names.

- Score tracking across rounds.

- Restart round (board reset, scores kept).

- Restart game (board and scores reset).

- Draw detection.

- Clean and responsive UI.

**How to Play**
- Enter player names in the input fields.

- Click on the cells to place your mark (X or O).

- The game announces the winner or a draw.

- Use New Round to start again while keeping scores.

- Use Restart Game to reset everything.

**Technologies Used**
- HTML5 for structure

- CSS3 for styling

- JavaScript (ES6) for game logic and DOM manipulation

**Technical Notes**
- The project is structured using IIFE (Immediately Invoked Function Expressions), sometimes referred to as an inner factor approach.

- This design keeps variables and functions encapsulated, avoiding global scope pollution.

    **Separate modules handle:**

      - Game Board – manages the state of the cells.

      - Game Controller – controls turns, checks for winners and draws.

      - Display Controller – updates the UI, handles user interactions, and score tracking.

      - This modular pattern makes the code easier to maintain and extend.

**Future Improvements**
- Add AI opponent mode.

- Highlight winning combination.

- Mobile‑friendly enhancements.

**Screenshot:**
<img width="2526" height="1337" alt="img1" src="https://github.com/user-attachments/assets/a60f1bac-9a9f-4cbf-a9b9-6f831bfc8ea4" />


