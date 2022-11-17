'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let totalScore, playing, currentScore, activePlayer;

// Starting conditions
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;
    // 3. Check for rolled 1
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// press hold functionality

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's total score
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    // 2. check if total score is higher than 100
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      // change winner's background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // change winner's name style
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    }
    // 3. Switch to next player
    switchPlayer();
  }
});

// Resetting game

btnNew.addEventListener('click', init);
