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

initGame();


let allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let moveCounter = document.querySelector('.moves');

allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

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
/*
//Count the players moves, start timer on first click, and set the rating based on moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves == 1) {
    second = 0;
    minute = 0;
    startTimer();
  }

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
*/
//Timer for the game
let second = 0;
let minute = 0;
let timer = document.querySelector('.timer');
let interval;

function startTimer() {
 interval = setInterval (function() {
   timer.innerHTML = `${minute} Minutes ${second} Seconds`;
   second++;
   if (second == 60) {
     minute++;
     second = 0;
   }
 },1000);
}

//Thanks to Mike Wales Memory Game video for helping me get started and working out some bugs.

/*

		if (moves === 1) {
			startTimer();
		}

		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
				openCards.push(card);
				card.classList.add('open', 'show');

				// if ()

				// If cards don't match - go away
				if (openCards.length == 2) {
						// If cards match
						if (openCards[0].dataset.card === openCards[1].dataset.card) {
							openCards.forEach(function(card) {
								card.classList.add('match');
								match.push(card);
							})
						}

						// If no match, flip cards over
						setTimeout(function() {
							openCards.forEach(function(card) {
								card.classList.remove('open', 'show');
							});

							openCards = [];
						}, 1000);
				}

				if (match.length === 16) {
					toggleModal();
					stopTimer();
				}
		};
	});
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Timer function
let sec = 0;
let min = 0;
let timer;
let timeClock = document.querySelector(".timer"); //timeclock = clock

function startTimer() {
	sec = 0;
	min = 0;
	timeClock.innerHTML = "0" + min + ":" + "0" + sec;
	timer = setInterval(insertTime, 1000); //inserTime inputTime
}

function stopTimer() {
	clearInterval(timer); //clears running time
}

function insertTime() {
	sec++;

	if (sec < 10) {
		sec = `0${sec}`;
	}

	if (sec >= 60) {
		min++;
		sec = "00";
	}

	//display time
	timeClock.innerHTML = "0" + min + ":" + sec;
}

// Moves counter function
let moves = 0; // sets count as zero;
let counter = document.querySelectorAll('span.moves'); // letiable for HTML where counter should live

function moveCounter() {
	moves++;
	counter[0].innerHTML = moves; //grabs the element from the node and resets it to moveCount
	starRating(moves);
};

// Remove stars function
let starsList = document.querySelectorAll('ul.stars'); //get the parent element

function starRating(moves) {
	if (moves === 12) {
		stars[0].removeChild(stars[0].children[0]);
	} else if (moves === 16) {
		stars[0].removeChild(stars[0].children[0]);
	}
}

//Grab modal letiables
let moveHTML = document.querySelector('.modal_moves');
let starsHTML = document.querySelector('.modal_stars');
let timeHTML = document.querySelector('.modal_time');
let timerValue = document.querySelectorAll('.timer');

//Modal toggle function
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	moveHTML.innerText = "Moves = " + moves;
	starsHTML.innerText = "Stars = " + starsList[0].childElementCount;
	timeHTML.innerText = "Time = " + timerValue[0].innerText;
	modal.classList.toggle('hide');
}

//Modal Buttons function
let cancelButton = document.querySelector('.modal_close');
let replayButton = document.querySelector('.modal_replay');
cancelButton.addEventListener('click', toggleModal);
replayButton.addEventListener('click', function() {
	toggleModal();
	resetGame();
});

//Reset stars
function resetStars() {
	if (stars[0].childElementCount === 2) {
		stars[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
	} else if (stars[0].childElementCount === 1){
			stars[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
			stars[0].insertAdjacentHTML('beforeend', '<li><i class="fa fa-star"></i></li>');
	}
}

//Reset game
let resetButton = document.querySelectorAll(".restart");

resetButton[0].addEventListener('click', resetGame);

function resetGame() {
	moves = 0;
	counter[0].innerHTML = moves;
	match = [];
	openCards = [];
	resetStars();
	stopTimer();
	second = 0;
	minute = 0;
	clock.innerHTML = "0" + min + ":" + "0" + sec;
	allCards.forEach(function(card) {
		if(card.classList.contains('match')) {
			card.classList.remove('match');
		}
	});
	let newCardList = Array.from(allCards);
	console.log(newCardList);
	shuffle(newCardList);
	let deck = document.querySelector('.deck');
	for (card of newCardList) {
		deck.appendChild(card);
	}
}
*/
