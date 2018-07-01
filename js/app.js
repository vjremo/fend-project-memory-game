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

    //Added function to set timer
    let hour = 0, minutes =0 , seconds = 0;
    let timer;
    let firstClick = false;

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
            console.log(formatTimer());
        }, 1000);
        
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function formatTimer() {
        let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
        let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
        return min  + ':' + sec;
    }
	//Added function to open cards upon click
    const deckElement = document.querySelector('.deck');
    let counter =0;
    let openCards = [];
    let moves;
    deckElement.addEventListener('click', function (event) {
    const targetCard = event.target;
    counter++;
    if(firstClick===false){
        firstClick = true; 
        //startTimer();
    }
    moves = document.querySelector('.moves');
    moves.innerHTML = counter;
    console.log(counter);
        if (targetCard.classList.contains('card')&& counter<3){
            openCards.push(targetCard);
            targetCard.classList.toggle('open');
            targetCard.classList.toggle('show');
        } else if (targetCard.classList.contains('card') && counter > 2){
            for(let card of openCards){
                card.classList.toggle('open');
                card.classList.toggle('show');
            }
        }
    });

    const resetGame = document.querySelector('.restart');
    resetGame.addEventListener('click', function () {
        moves.innerHTML=0;
        
    })

