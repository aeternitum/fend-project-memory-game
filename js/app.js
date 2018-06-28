//This is from scratch to see if I can get it. First going to have the list of cards followed by
//declaring all the variables

let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'];

let moves = 0;
let moveCounter = document.querySelector('.moves');
let matchedCards = document.getElementsByClassName('match');
let stars = document.querySelectorAll('.fa-star');
let starsEarned = document.querySelectorAll('.stars li');
let closeIcon = document.querySelector('.close');
let modal = document.getElementById('winnerPopup');


function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = initGame();

function initGame() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card)
  });
  moves = 0;
  moveCounter.innerText = moves;

  deck.innerHTML = cardHTML.join('');

  flipCards();
}

function flipCards() {
let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');

          openCards = [];
        } else {
     //If no match-hide
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });

            openCards = [];
          }, 1000);
        }

      moveCount();
      starRating();
      }
    }
  });
});
}
//Move counter for the game
function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  if (moves === 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
}

//Star rating for the game
function starRating() {
  if (moves > 8 && moves < 12) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  } else if (moves > 13) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}

//Timer for the game
//Timer for the game
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let interval;

function startTimer() {
 interval = setInterval (function() {
   timer.innerHTML = `${minute}:${second}`;
   second++;

   if (second == 60) {
     minute++;
     second = 0;
   }
 },1000);
}

//reset the timer
function resetTimer() {
  second = 0;
  minute = 0;
  timer =   document.querySelector('.timer');
  timer.innerHTML = '0:00';
  clearInterval(interval);
}

//Click event for the restart button
let resetButton = document.querySelector('.restart');
//When clicked, reset the timer, star rating, and move counter and call initGame again
resetButton.addEventListener('click', resetGame);

function resetGame() {
//Reset the timer
  second = 0;
  minute = 0;
  hour = 0;
  let timer = document.querySelector('.timer');
  timer.innerHTML = '0:0';
  clearInterval(interval);

//Reset move counter and star rating
  moves = 0;
  moveCounter.innerHTML = moves;
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = '#7F3FBF';
    stars[i].style.visibility = 'visible';
  }
  openCards = [];
  initGame();
  allCards.forEach(function(card) {
    if(card.classList.contains('match')) {
      card.classList.remove('match');
    }
  });

  let newCardList = Array.from(cards);
  shuffle(newCardList);
  deck = document.querySelector('.deck');
  for (card of newCardList) {
    deck.appendChild(card);
  }
}

//modal function with some HTML to try to start with

function youWin() {
  if (matchedCards.length == 16) {
    clearInterval(interval);
    finalTime = timer.inner.HTML;

    modal.classList.add('show');

    let starRating = document.querySelector('.stars').innerHTML;

    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('starRating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;

    closeModal();
  };
}

function closeModal() {
  closeIcon.addEventListener('click', function() {
    modal.classList.remove('show');
    startGame();
  });
}

function playAgain() {
  modal.classList.remove('show');
  startGame();
}

  // Loop to add event listeners to each card
for (let i = 0; i < cardList.length; i++){
    card = cardList[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click',congratulations);
}

/*<button id="myBtn">Open Modal</button>
<div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Some text in the Modal..</p>
*/
