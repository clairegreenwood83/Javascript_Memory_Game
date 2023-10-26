const cardArray = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
     {
        name: 'fries',
        img: 'images/fries.png',
    },
     {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
     {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
     {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
     {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
     {
        name: 'fries',
        img: 'images/fries.png',
    },
     {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
     {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
     {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
     {
        name: 'pizza',
        img: 'images/pizza.png',
    },
];

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('You have clicked the same image!')
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert('Sorry try again!')
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id') // to get the id of the card clicked
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId) // puts the name of the card clicked into cardsChosen array
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

// timer functionality
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
const displayElement = document.getElementById('timerDisplay');

let startTime;
let interval;

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
        interval = setInterval(updateTime, 1000);
    }
}

function stopTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        startTime = null;
      }
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    const elapsedTimeSeconds = Math.floor(elapsedTime / 1000);

    displayElement.innerHTML = elapsedTimeSeconds + ' seconds';
}
