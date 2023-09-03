'use strict';

// Selecing elements
const scoreZero = document.querySelector('#score--0');
// alternative way of selecting the elements that are Ids
const scoreOne = document.getElementById('score--1');
const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceValue = document.querySelector('.dice');

const playerZero = document.querySelector('.player--0');
const playerOne = document.querySelector('.player--1');

// adding dynamic variables
let scores, currentScore, activePlayer, playing;

const initialize = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreOne.textContent = 0;
  scoreZero.textContent = 0;
  currentZero.textContent = 0;
  currentOne.textContent = 0;

  diceValue.classList.add('hidden');
  playerZero.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
  playerOne.classList.remove('player--active');
};

initialize();
// Function to Switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZero.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1> Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2> Display the dice
    diceValue.classList.remove('hidden');
    diceValue.src = `dice-${dice}.png`;
    // 3> Check if rolled 1
    if (dice != 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      // switch to next player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1> Adding current score to the active player score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2> Check If active player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceValue.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // Else Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialize);
