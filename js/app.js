//Make a list of all the cards

let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb',
            ];

let counter = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');
let matchedCards = document.getElementsByClassName('match');
let starsEarned = document.querySelectorAll('.stars li');
//let closeIcon = document.querySelector('.close');
//let modal = document.getElementById('congratsPopup');

//Adds each cards HTML to the page
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  done- display the card's symbol (put this functionality in another function that you call from this one)
 *  done- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  done- if the list already has another card, check to see if the two cards match
 *  done  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *  done  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 document.body.onload = initGame();

function initGame() {
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });

  let moves = 0;
  let moveCounter = document.querySelector('.moves');
  moves = 0;
  moveCounter.innerText = moves;

  deck.innerHTML = cardHTML.join('');
}


let allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let moveCounter = document.querySelector('.moves');

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

//Start timer for the game after first click
    if (moves <= 1) {
      startTimer();
    }

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

       moves += 1;
       moveCounter.innerText = moves;
     }
   }
 });
});

//Count the players moves, start timer on first click, and set the rating based on moves

  if (moves > 6 && moves < 10) {
    for (let i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  } else if (moves > 11) {
    for (let i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }



//Timer for the game
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let interval;

function startTimer() {
 interval = setInterval (function() {
   timer.innerHTML = `${minute} : ${second}`;
   second++;
   if (second == 60) {
     minute++;
     second = 0;
   }
 },1000);
}

function stopTimer() {

}

//Thanks to Mike Wales Memory Game video for helping me get started and working out some bugs.
