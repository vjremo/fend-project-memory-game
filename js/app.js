/*
 * Create a list that holds all of your cards
 */
    const deckElement = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
    const shuffledDeck = shuffle(Array.from(document.querySelectorAll('.card')));

    for (card of shuffledDeck) {
        deckElement.appendChild(card);
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
    deckElement.addEventListener('click', gameLogic);

    //Main function to open cards upon click, hide cards, start counter, stop counter and moves
    let openCards = [];
    function gameLogic(event) {
        const targetCard = event.target;
        if (!targetCard.classList.contains('card')) {
            return;
        }
        if (firstClick === false) {
            firstClick = true;
            startTimer();
        }
        if (verifyCardSate(targetCard)) {
            openCards.push(targetCard);
            counter++;

            openCard(targetCard);

            setMoves(moves);
            setScores(counter);

            if (openCards.length === 2) {
                if (openCards[0].children[0].classList.value === openCards[1].children[0].classList.value) {
                    matchCard(openCards[0]);
                    matchCard(openCards[1]);
                    
                    matches++;
                    if (matches === 8) {
                        stopTimer();
                        displayResults();
                        return;
                    }
                    openCards = [];
                }
                setTimeout(function () {
                    openCards.forEach(function (targetCard) {
                        closeCard(targetCard);
                    });
                    openCards = [];
                }, 1000);
            }
        }
    }

    
    let firstClick = false;
    let matches = 0;
    let counter = 0;
    
    const restartGame = document.querySelector('.restart');
    restartGame.addEventListener('click', resetGame);

    let rating = document.querySelector('.stars');
    let moves = document.querySelector('.moves');

    let minutes =0 , seconds = 0;
    let timer;
    
    //Function to set timer
    function startTimer() {
        timer = setInterval(function () {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hour++;
                minutes = 0;
            }
            document.querySelector('.timer').innerText = formatTimerDisplay();
        }, 1000);
        
    }
    //Function to stop timer
    function stopTimer() {
        clearInterval(timer);
        document.querySelector('.timer').innerText = formatTimerDisplay();
    }
    //Format timer display
    function formatTimerDisplay() {
        let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
        let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
        return min  + ':' + sec;
    }

    function verifyCardSate(targetCard) {
        return !targetCard.classList.contains('open') && !targetCard.classList.contains('show') &&
            !targetCard.classList.contains('match');
    }

    function setMoves() {
        moves.innerHTML = counter;
    }

    function matchCard(card) {
        card.classList.toggle('match');
    }
    function closeCard(card) {
        card.classList.remove('open', 'show');
    }
    function openCard(card) {
        card.classList.add('open', 'show');
    }
    //Resets Game board
    function resetGame() {
        moves.innerHTML = "";
        window.location.reload();
    }

    function setScores(counter){
        if (counter > 16 && counter <= 24 && rating.children.length ===3) {
            let replcaeStar = rating.children[2]; 
            rating.removeChild(replcaeStar);
        }
        else if (counter > 24 && counter <= 32 && rating.children.length ===2) {
            let replcaeStar1 = rating.children[1];
            rating.removeChild(replcaeStar1);
        }
    }
    function displayResults() {
        const modalElement = document.querySelector('.modal_bg');
        toggleModal(modalElement);
        addGameStats();
        document.querySelector('.replay').addEventListener('click', resetGame);
        document.querySelector('.cancel').addEventListener('click', toggleModal(modalElement));
    }

    function toggleModal(modalElement) {
        modalElement.classList.toggle('vanish');
    }

    function addGameStats() {
        const timeSpan = document.querySelector('.game_time');
        const stopWatch = document.querySelector('.timer').innerHTML;
        timeSpan.innerHTML = `Time taken= ${stopWatch}`;
        const moveTracker = document.querySelector('.game_moves');
        moveTracker.innerHTML = `Moves made= ${moves.innerHTML}`;
        const ratingTracker = document.querySelector('.game_rating');
        ratingTracker.innerHTML = `Your rating= ${rating.children.length}`;
    }
