//MEMORY GAME
//AUTHOR: NANDANA KRISHNA

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const playGameBtn = document.getElementById("playGameBtn");
  const viewRulesBtn = document.getElementById("viewRulesBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const statsBtn = document.getElementById("statsBtn");
  const restartBtn = document.getElementById("restartBtn");
  const settingsForm = document.getElementById("settingsForm");
  const playerNameInput = document.getElementById("playerNameInput");
  const cardCountInput = document.getElementById("cardCount");
  const gameArea = document.getElementById("gameArea");
  const rulesSection = document.getElementById("rules");
  const settingsSection = document.getElementById("settings");
  const statsSection = document.getElementById("stats");
  const cardsContainer = document.getElementById("cardsContainer");
  const playerNameSpan = document.getElementById("playerName");
  const movesCountSpan = document.getElementById("movesCount");
  const timeElapsedSpan = document.getElementById("timeElapsed");

  // Game variables
  let playerName = "Guest";
  let movesCount = 0;
  let timer = null;
  let timeElapsed = 0;
  let selectedCards = [];
  let matchedPairs = 0;
  let isProcessing = false;
  const cardImages = Array.from(
    { length: 24 },
    (_, i) => `./images/card_${i + 1}.png`
  );
  let cards = [];
  let cardCount = 48;

  // Event listeners
  playGameBtn.addEventListener("click", startGame);
  viewRulesBtn.addEventListener("click", () => showSection(rulesSection));
  settingsBtn.addEventListener("click", () => showSection(settingsSection));
  statsBtn.addEventListener("click", showStats);
  restartBtn.addEventListener("click", startGame);
  settingsForm.addEventListener("submit", saveSettings);

  /*Show the specified section while hiding others*/
  function showSection(section) {
    const allSections = [gameArea, rulesSection, settingsSection, statsSection];
    allSections.forEach((s) => s.classList.add("hidden"));
    section.classList.remove("hidden");
  }

  /*Start a new game*/
  function startGame() {
    resetGame();
    showSection(gameArea);
    document.getElementById("gameInfo").classList.remove("hidden"); // Show game info when starting
    generateCards();
    startTimer();
  }

  /*Reset the game variables and UI elements*/
  function resetGame() {
    clearInterval(timer);
    timeElapsed = 0;
    movesCount = 0;
    matchedPairs = 0;
    selectedCards = [];
    isProcessing = false;

    // Reset displayed values
    movesCountSpan.textContent = movesCount;
    timeElapsedSpan.textContent = timeElapsed;

    // Hide game info initially
    document.getElementById("gameInfo").classList.add("hidden");

    cardsContainer.innerHTML = "";
  }

  //Generate cards and layout based on the selected card count
  function generateCards() {
    const totalCards = parseInt(cardCount);
    const selectedImages = cardImages.slice(0, totalCards / 2);
    cards = shuffle([...selectedImages, ...selectedImages]);

    let gridColumns, gridRows, containerWidth, containerHeight;
    switch (totalCards) {
      case 8:
        gridColumns = 4;
        gridRows = 2;
        containerWidth = "400px";
        containerHeight = "240px";
        break;
      case 16:
        gridColumns = 4;
        gridRows = 4;
        containerWidth = "400px";
        containerHeight = "480px";
        break;
      case 32:
        gridColumns = 8;
        gridRows = 4;
        containerWidth = "800px";
        containerHeight = "480px";
        break;
      case 48:
        gridColumns = 10;
        gridRows = 5;
        containerWidth = "800px";
        containerHeight = "480px";
        break;
      default:
        gridColumns = Math.ceil(Math.sqrt(totalCards));
        gridRows = Math.ceil(totalCards / gridColumns);
        containerWidth = `${gridColumns * 100}px`;
        containerHeight = `${gridRows * 120}px`;
    }

    cardsContainer.style.width = containerWidth;
    cardsContainer.style.height = containerHeight;
    cardsContainer.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
    cardsContainer.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;

    cardsContainer.innerHTML = "";
    cards.forEach((image, index) => {
      const card = createCardElement(image, index);
      cardsContainer.appendChild(card);
    });
  }

  //Create a card DOM element
  function createCardElement(image, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    const backImage = document.createElement("img");
    backImage.src = "./images/back.png";
    backImage.classList.add("back");
    const frontImage = document.createElement("img");
    frontImage.src = image;
    frontImage.classList.add("front");
    frontImage.style.opacity = "0";
    card.appendChild(backImage);
    card.appendChild(frontImage);
    card.addEventListener("click", handleCardClick);
    return card;
  }

  //Handle card click events
  function handleCardClick(event) {
    if (isProcessing) return;
    const clickedCard = event.currentTarget;
    if (
      clickedCard.classList.contains("flipped") ||
      clickedCard.classList.contains("matched")
    )
      return;

    flipCard(clickedCard);
    selectedCards.push({
      card: clickedCard,
      index: parseInt(clickedCard.dataset.index),
    });

    if (selectedCards.length === 2) {
      movesCount++;
      movesCountSpan.textContent = movesCount;
      isProcessing = true;
      setTimeout(() => {
        if (cards[selectedCards[0].index] === cards[selectedCards[1].index]) {
          selectedCards.forEach(({ card }) => {
            card.classList.add("matched", "blank");
            card.style.border = "none";
            card.style.backgroundColor = "transparent";
            card.innerHTML = ""; // Remove all content from the card
          });
          matchedPairs++;
          if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            saveHighScore();
            confetti();
            showScorePopup();
          }
        } else {
          selectedCards.forEach(({ card }) => {
            unflipCard(card);
            card.classList.remove("flipped");
          });
        }
        selectedCards = [];
        isProcessing = false;
      }, 300);
    }
  }

  //Flip a card to reveal its front side
  function flipCard(card) {
    card.querySelector(".back").style.opacity = "0";
    card.querySelector(".front").style.opacity = "1";
  }

  //
  function unflipCard(card) {
    if (!card.classList.contains("matched")) {
      card.querySelector(".back").style.opacity = "1";
      card.querySelector(".front").style.opacity = "0";
    }
  }

  function startTimer() {
    timer = setInterval(() => {
      timeElapsed++;
      timeElapsedSpan.textContent = timeElapsed;
    }, 1000);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function saveSettings(event) {
    event.preventDefault();
    const newPlayerName = playerNameInput.value || "Guest";
    const newCardCount = parseInt(cardCountInput.value);
    const difficulty = getDifficultyLevel(newCardCount);
    showSettingsPopup(newPlayerName, newCardCount, difficulty);
  }

  function getDifficultyLevel(cardCount) {
    switch (cardCount) {
      case 8:
        return "Easy";
      case 16:
        return "Medium";
      case 32:
        return "Hard";
      case 48:
        return "Expert";
      default:
        return "Custom";
    }
  }

  /*Save the high score to localStorage*/

  function saveHighScore() {
    const currentScore = calculateScore(1000, 1, 5, timeElapsed, movesCount);
    const difficulty = getDifficultyLevel(cardCount);
    const scores = JSON.parse(localStorage.getItem("topScores")) || [];
    scores.push({ playerName, score: currentScore, difficulty });
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 5) scores.pop();
    localStorage.setItem("topScores", JSON.stringify(scores));
  }

  //Show a popup with the final score
  function showScorePopup() {
    createOverlay();
    const score = calculateScore(1000, 1, 5, timeElapsed, movesCount);
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
          <div class="popup-content">
              <button class="close-popup">&times;</button>
              <h2>Well done!</h2>
              <p>Score: ${score}</p>
              <button id="restartGameBtn">Restart Game</button>
          </div>
      `;
    document.body.appendChild(popup);

    // Close popup event
    document.querySelector(".close-popup").addEventListener("click", () => {
      document.body.removeChild(popup);
      removeOverlay();
    });

    document.getElementById("restartGameBtn").addEventListener("click", () => {
      resetGame();
      document.body.removeChild(popup);
      removeOverlay();
      startGame();
    });
  }

  function calculateScore(
    maxScore,
    weightForTime,
    weightForMoves,
    timeTaken,
    numberOfMoves
  ) {
    return Math.max(
      0,
      maxScore - weightForTime * timeTaken - weightForMoves * numberOfMoves
    );
  }
  function showSettingsPopup(newPlayerName, newCardCount, difficulty) {
    createOverlay();
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
          <button class="close-popup">&times;</button>
          <h2>Settings Saved</h2>
          <p>Player Name: ${newPlayerName}</p>
          <p>Difficulty: ${difficulty} (${newCardCount} cards)</p>
          <button id="playGameBtn">Play Game</button>
        </div>
      `;
    document.body.appendChild(popup);

    // Close popup event
    popup.querySelector(".close-popup").addEventListener("click", () => {
      document.body.removeChild(popup);
      removeOverlay();
    });

    // Play Game button event
    popup.querySelector("#playGameBtn").addEventListener("click", () => {
      playerName = newPlayerName;
      cardCount = newCardCount;
      playerNameSpan.textContent = playerName;
      document.body.removeChild(popup);
      removeOverlay();
      showSection(gameArea);
      startGame();
    });
  }

  // Display the stats (high scores)
  function showStats() {
    const statsTable = document.getElementById("statsTable");
    statsTable.innerHTML = "";
    const scores = JSON.parse(localStorage.getItem("topScores")) || [];

    const headerRow = document.createElement("tr");
    headerRow.innerHTML =
      "<th>Rank</th><th>Player</th><th>Score</th><th>Difficulty</th>";
    statsTable.appendChild(headerRow);

    scores.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td><td>${entry.playerName}</td><td>${
        entry.score
      }</td><td>${entry.difficulty}</td>`;
      statsTable.appendChild(row);
    });

    showSection(statsSection);
  }
  // Canvas-Confetti setup (requires canvas-confetti library)
  const confetti = () => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    const confettiInstance = window.confetti.create(canvas, { resize: true });
    confettiInstance({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
    setTimeout(() => document.body.removeChild(canvas), 3000);
  };

  function createOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
    disableNavButtons();
  }

  function removeOverlay() {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      document.body.removeChild(overlay);
    }
    enableNavButtons();
  }

  function disableNavButtons() {
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach((button) => (button.disabled = true));
  }

  function enableNavButtons() {
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach((button) => (button.disabled = false));
  }
});
