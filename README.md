

# Memory Game

The **Memory Game** is an engaging and interactive web-based game where players flip over two cards at a time to find matching pairs. The game continues until all pairs are matched. It offers customizable difficulty levels, score tracking, and a user-friendly interface with features like high score storage and responsive design.

## Features
The Memory Game includes the following features, accessible through four main tabs in the user interface:

1. **Play Game**
   - Start a new game session.
   - Displays player name and time taken.
   - Includes a **Restart** button to reset the timer and start a new game.

2. **View Rules**
   - Provides instructions and tips on how to play, including how to flip cards, match pairs, and end the game.

3. **Settings**
   - Customize the game by:
     - Entering a player name (default: "GUEST").
     - Choosing a difficulty level:
       - **Easy**: 8 cards
       - **Medium**: 16 cards
       - **Hard**: 32 cards
       - **Expert**: 48 cards (default)
   - Save settings to trigger a popup confirming the player name and difficulty, with options to start the game or close the popup.

4. **Stats**
   - Displays the top five high scores stored in local storage, including:
     - Player name
     - Score (calculated as: `maxScore - (weightForTime * timeTaken) - (weightForMoves * numberOfMoves)`)
     - Difficulty level
     - Rank

## How to Play
1. **Flipping Cards**:
   - Click a card to reveal its face.
   - Click a second card; both remain visible for 1 second.
   - If the cards match, they stay flipped (marked as matched with a blank image).
   - If they don't match, they flip back after a brief delay.

2. **End of Game**:
   - The game ends when all pairs are matched.
   - A popup displays the final score, calculated based on time taken and moves made.
   - Confetti celebrates the victory.
   - The score is saved to local storage and displayed in the Stats tab.

3. **Restart**:
   - Click the **Restart** button to reset the timer and start a new game.

## Technologies Used
- **HTML**: Structures the web pages.
- **CSS**: Styles the game for a visually appealing and responsive design.
- **JavaScript**: Handles game logic, user interactions, and DOM manipulation.
- **Local Storage**: Saves high scores and player progress across sessions.

## Installation
To run the Memory Game locally, follow these steps:

1. **Download the Project**:
   - Clone this repository or download it as a ZIP file:
     ```bash
     git clone https://github.com/<your-username>/memory-game.git
     ```

2. **Extract the Files**:
   - If downloaded as a ZIP, extract the contents to a folder on your computer.

3. **Open the Game**:
   - Navigate to the project folder and open `index.html` in a web browser.

4. **Play**:
   - Use the **Play Game**, **View Rules**, **Settings**, and **Stats** tabs to interact with the game.

## Code Implementation
The game is built with modular and reusable code, leveraging key programming concepts:

- **Variables and Data Types**:
  - Uses `let` and `const` for variables like `cardArray` (shuffled cards), `flippedCards` (tracking flipped cards), `score`, and `moves`.
  - Arrays store card data, numbers track scores/moves, and strings manage card names or image paths.

- **Control Statements**:
  - `if` and `else` statements handle conditions like matching cards or game completion.
  - Logical operations (e.g., `===`) check for matches.

- **Functions**:
  - `initGame()`: Initializes the game state and cards.
  - `flipCard()`: Manages card flipping and state updates.
  - `checkMatch()`: Compares flipped cards and updates the game.
  - `updateScore()`: Calculates and displays the score.

- **DOM Manipulation**:
  - Uses `classList.add()` for card flipping animations and `setTimeout()` for delays.
  - Updates the UI dynamically with `document.getElementById()` for scores, moves, and game status.

- **Local Storage**:
  - Saves high scores and player data using the `localStorage` API, ensuring persistence across sessions.

## Testing and Debugging
The game was thoroughly tested during development using:
- **Console Logging**: Tracks variable values and game state.
- **Breakpoints**: Inspects variables in the browser's developer tools.
- **Conditional Logging**: Logs specific conditions to isolate issues.
- **DOM Checks**: Verifies correct UI updates after actions.
- **Simulated Input**: Tests game flow by simulating card flips.
- **Game State Inspection**: Ensures consistency in `flippedCards`, `score`, and `moves`.
- **Error Handling**: Manages unexpected behaviors like undefined values.
- **Local Storage Checks**: Confirms proper saving and retrieval of data.

## Future Improvements
Potential enhancements for future iterations include:
- **Timer**: Add a countdown for added challenge.
- **Sound Effects**: Integrate audio for card flips and game completion.
- **Mobile Responsiveness**: Enhance compatibility across devices.
- **Customization**: Allow users to change themes, card designs, or backgrounds.
- **Accessibility**: Add text-to-speech and accessible color schemes.

## Conclusion
The Memory Game is a fully functional web application built with HTML, CSS, and JavaScript, demonstrating core web development concepts like DOM manipulation, local storage, and modular code design. It provides an engaging user experience with features like customizable difficulty, score tracking, and a responsive interface. With a solid foundation, the game is well-positioned for future enhancements like sound effects, improved accessibility, and multiplayer modes.


## Author
- **Nandana Krishna** 

- 📧 nandanakrishna4523@gmail.com
-📚 This project was developed as part of the University of Greenwich Module: ELEE-1159 Web Systems Engineering   
