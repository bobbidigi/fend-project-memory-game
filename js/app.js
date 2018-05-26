/*
 * Create a list that holds all of your cards
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 * 
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// globals
const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

const winDisplay = document.querySelector('.win');
const playAgain = document.getElementById('reset-won');
const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
let moves = 0;
const moveCounter = document.querySelector('.moves');
const stars = document.querySelector('.stars');
let star = 8;
let t = 1;
const scoreSound = document.getElementById('success-sound');
const winGameSound = document.getElementById('win-sound');


// timer func
function Timer() {
    var timer = setInterval(function() {
        console.log(t);
        t++;
        if (matchedCards.length == 16) {
            clearInterval(timer);
        }
    }, 1000);
}

var timer = new Timer();





function initGame() {
    let cardHTML = shuffle(cards).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardHTML.join(" ");
    makeStars(star);
}

initGame();

function makeCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// eleminate all stars and create stars based on player moves
function makeStars(el) {
    while (stars.hasChildNodes()) {
        stars.removeChild(stars.firstChild);
    }
    for (let i = 1; i <= el; i++) {
        const starLi = document.createElement('li');
        const starI = document.createElement('i');
        starI.classList.add('fa', 'fa-star');
        starLi.appendChild(starI);
        stars.appendChild(starLi);
    }
}

// winner func pop-up and winnersound
function winner(moves) {
    winGameSound.play();
    winDisplay.style.display = 'flex';
    winDisplay.innerHTML = `<h1>You won in ${moves} moves!</h1>
                                <h1>You earned ${star} stars!</h1>
                                <h1>You won in ${t} seconds!</h1>
                                  <button id='reset-won'>PLAY AGAIN</button>`;
    winDisplay, addEventListener('click', function(e) {
        if (e.target.id == 'reset-won') {
            winDisplay.style.display = 'none';
            reset();
        }
    });
}

// reset-won and restart for restart
restart.addEventListener('click', reset);

function reset() {
    location.reload();
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


const allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];


allCards.forEach(function(card) {

    card.addEventListener('click', function(e) {
        // click if cards arent open, matching, or not more than 2 cards open
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && !(openCards.length >= 2)) {
            openCards.push(card);
            open(card);
            // if there are 2 open cards
            if (openCards.length > 1) {
                // check if they match
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    console.log(openCards);
                    // add match class and push to matchedCards array
                    matchedCards.push(openCards[0]);
                    matchedCards.push(openCards[1]);
                    match(openCards[0]);
                    match(openCards[1]);
                    openCards = [];
                    // add star for match
                    star += 1;
                    // add move
                    movesCount(1);
                    makeStars(star);
                    // play score sound
                    scoreSound.play();
                    // if all 16 matched 
                    if (matchedCards.length == 16) {
                        //winner func up top
                        winner(moves);
                    }
                } else {
                    // add move
                    movesCount(1);
                    // take away a star
                    star -= 1;
                    makeStars(star);
                    // if cards dont match turn down and reset open cards to []
                    openCards.forEach(function(card) {
                        // no match animation
                        card.classList.add('wrong-bounce');
                        // turn down card remove all classes
                        setTimeout(function() {
                            card.classList.remove('open', 'show', 'wrong-bounce');
                            openCards = [];
                        }, 1000);
                    });
                }
            }

        }
    });
});
//open
function open(el) {
    el.classList.add('open', 'show');
}
//match
function match(el) {
    el.classList.add('open', 'show', 'match');
}

//moves counter
function movesCount(i) {
    moves += i;
    moveCounter.innerText = moves;
}

//set up the event listener for a card. If a card is clicked:
//  - display the card's symbol (put this functionality in another function that you call from this one)
//  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//  - if the list already has another card, check to see if the two cards match
//    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
//     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)