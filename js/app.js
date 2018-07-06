/*
 * Create a list that holds all of your cards
 */


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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

    //Function to set timer
    let hour = 0, minutes =0 , seconds = 0;
    let timer;
    

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
            document.querySelector('.timer').innerHTML = formatTimer();
        }, 1000);
        
    }
    //Function to stop timer
    function stopTimer() {
        clearInterval(timer);
        const stopWatch = document.querySelector('.timer');
        stopWatch.innerHTML = formatTimer();
    }
    //Format timer display
    function formatTimer() {
        let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
        let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
        return min  + ':' + sec;
    }

    let firstClick = false;
    let matches = 0;

    let deckElement = document.querySelector('.deck');

    const deckChildren = document.querySelectorAll('.card');

    const shuffledDeck = shuffle(Array.from(deckChildren));
    deckElement.innerHTML='';

    for (crd of shuffledDeck){
        deckElement.appendChild(crd);
    }

    let counter = 0;
    let openCards = [];
    let score = document.querySelector('.stars');
    let moves = document.querySelector('.moves');
    deckElement.addEventListener('click', gameLogic);

    //Main function to open cards upon click, hide cards, start counter, stop counter and moves
    function gameLogic(event) {
        const targetCard = event.target;
        if(!targetCard.classList.contains('card')){
            return;
        }
        if (firstClick === false) {
            firstClick = true;
            startTimer();
        }

        if (!targetCard.classList.contains('open') && !targetCard.classList.contains('show') && !targetCard.classList.contains('match') ){
            openCards.push(targetCard);
            counter++;
            moves.innerHTML = counter;
            targetCard.classList.add('open', 'show');

            setScores(counter);
        
            if(openCards.length===2){
                if (openCards[0].firstElementChild.classList.value === openCards[1].firstElementChild.classList.value){
                    console.log('This is a match!!');               
                    openCards[0].classList.toggle('match');
                    openCards[1].classList.toggle('match');

                    matches++;
                    if (matches === 8) {
                        console.log("all matched!");
                        stopTimer();
                        return;
                    }
                    openCards = [];
                }

                setTimeout(function () {
                    openCards.forEach(function (targetCard) {
                        targetCard.classList.remove('open', 'show');
                    });
                    openCards = [];

                }, 1000);
            }
        }
    }

    //Function to reset board 
    const resetGame = document.querySelector('.restart');
    resetGame.addEventListener('click', function () {
        moves.innerHTML=0;
        window.location.reload();
    })

    function setScores(counter){
        if (counter > 16 && counter <= 24) {
            score.children[2].firstChild.classList.toggle('fa-star');
            score.children[2].firstChild.classList.toggle('fa-star-o');
        }
        else if (counter > 24 && counter <= 32) {
            score.children[1].firstChild.classList.toggle('fa-star');
            score.children[1].firstChild.classList.toggle('fa-star-o');
            score.children[2].firstChild.classList.toggle('fa-star');
            score.children[2].firstChild.classList.toggle('fa-star-o');
        }
    }
