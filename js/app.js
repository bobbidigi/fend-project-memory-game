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

function initGame() {
    let cardHTML = shuffle(cards).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardHTML.join(" ");
}

initGame();

function makeCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

function winner(moves) {
    winDisplay.style.display = 'flex';
    winDisplay.innerHTML = `<h1>Congratulation you won in ${moves} moves!</h1>
                                  <button id='reset-won'>PLAY AGAIN</button>`;
    winDisplay, addEventListener('click', function(e) {
        if (e.target.id == 'reset-won') {
            winDisplay.style.display = 'none';
            // reset();
        }
    });
}

// reset-won and restart for restart
function reset() {
    // movesCount(-moves);
    // console.log(matchedCards.length);
    // console.log(openCards.length);
    // openCards = [];
    // matchedCards = [];
    // allCards.forEach(function(card) {
    // if(card.hasAttribute('open', ''))
    // card.classList.remove('open', 'show', 'match');
    // });
    initGame();
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
            // check if they match using dataset open cards
            if (openCards[0].dataset.card == openCards[1].dataset.card) {
                // add match class
                matchedCards.push(openCards[0]);
                matchedCards.push(openCards[1]);
                match(openCards[0]);
                match(openCards[1]);
                openCards = [];
                movesCount(1);
                if (matchedCards.length == 16) {
                    setTimeout(function() {
                        matchedCards.forEach(function(card) {
                            unmatch(card);
                        });
                        matchedCards = [];
                        openCards = [];
                        movesCount(-moves);
                    }, 5000);
                    winner(moves);
                }
            } else {
                movesCount(1);
                // if cards dont match turn down and reset open cards to []
                openCards.forEach(function(card) {
                    setTimeout(function() {
                        card.classList.remove('open', 'show');
                        openCards = [];
                    }, 1000);
                });
            }
        }
    });
});

function open(el) {
    el.classList.add('open', 'show');
}

function match(el) {
    el.classList.add('open', 'show', 'match');
}

function unmatch(el) {
    el.classList.remove('open', 'show', 'match');
}

function close(el) {
    el.classList.remove('open', 'show', 'match');
}

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

// allCards.forEach(function (card) {

//     card.addEventListener('click', function (e) {

//         if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && !(openCards.length >= 2)) {
//             openCards.push(card);
//             open(card);

//             // check if they match using dataset
//             if (openCards[0].dataset.card == openCards[1].dataset.card) {
//                 match(openCards[0]);
//                 match(openCards[1]);
//             }


//             // if cards dont match turn down and reset open cards to []
//             if (openCards.length == 2) {
//                 openCards.forEach(function (card) {
//                     setTimeout(function () {
//                         card.classList.remove('open', 'show');
//                         openCards = [];
//                     }, 1000);
//                 });
//             }
//         }
//     });
// });