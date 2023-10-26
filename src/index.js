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
displayLeaderboard();

let completionTime = localStorage.getItem('completionTime');

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
        //alert('You have clicked the same image!')
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        //alert('You found a match!')
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        //alert('Sorry try again!')
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations you found them all!'
        const elapsedTime = Date.now() - startTime;
        const elapsedTimeSeconds = Math.floor(elapsedTime / 1000);
        localStorage.setItem('completionTime', elapsedTimeSeconds);
        stopTimer();

        const userName = prompt("Congratulations! Please enter your name for the leaderboard:", "");
            if (userName) {
                updateLeaderboard(userName, elapsedTimeSeconds);
            }
    }
}

function getLeaderboard() {
    const leaderboardString = localStorage.getItem('leaderboard');
    if (leaderboardString) {
        return JSON.parse(leaderboardString);
    } else {
        return [];
    }
}

function updateLeaderboard(name, time) {
    const leaderboard = getLeaderboard();
    leaderboard.push({ name: name, time: time });
    
    leaderboard.sort((a, b) => a.time - b.time);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboard = getLeaderboard();
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        row.appendChild(nameCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = `${entry.time} seconds`;
        row.appendChild(timeCell);

        leaderboardBody.appendChild(row);
    });
}

let gameStarted = false;

function flipCard() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }
    if (cardsChosen.length === 2) {
        return;
    }
    const cardId = this.getAttribute('data-id') // to get the id of the card clicked
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId) // puts the name of the card clicked into cardsChosen array
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}


// timer functionality
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
