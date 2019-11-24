const gameButtons = document.querySelectorAll('.push');
const startBtn = document.querySelector('#start');
const restartBtn = document.querySelector('#restart');
const rules = document.querySelector('#rules-btn')
const display = document.querySelector('#counter');
const buttonsObj = [{
        button: document.querySelector('#blue'),
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        idx: document.querySelector('#blue').dataset.idx,
        active: 'blue-active'
    },
    {
        button: document.querySelector('#purple'),
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        idx: document.querySelector('#purple').dataset.idx,
        active: 'purple-active'
    },
    {
        button: document.querySelector('#orange'),
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        idx: document.querySelector('#orange').dataset.idx,
        active: 'orange-active'
    },
    {
        button: document.querySelector('#yellow'),
        sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
        idx: document.querySelector('#yellow').dataset.idx,
        active: 'yellow-active'
    }
];

let gameStart = false;
let gameRestart = false;
let counter = 0;
let playerCounter = 0;
let playerMoves = [];
let computerMoves = [];
let delay = 1000;
let turn = false;

Array.from(gameButtons).forEach(buttons => {
    buttons.addEventListener('click', simonGame);
});

// General button behavior (sounds, active state, delay)
function buttonFunc(eventVar, soundVar, activeClass) {
    playSound(soundVar);
    eventVar.classList.add(activeClass);
    setTimeout(function () {
        eventVar.classList.remove(activeClass);
    }, 250);
}

function simonGame(e) {

    if (gameStart) {

        let buttonID = e.target.dataset.idx;

        if (turn) {
            if (e.target.id === 'blue') {
                buttonFunc(e.target, buttonsObj[0].sound, buttonsObj[0].active);
            }
            if (e.target.id === 'purple') {
                buttonFunc(e.target, buttonsObj[1].sound, buttonsObj[1].active);
            }
            if (e.target.id === 'orange') {
                buttonFunc(e.target, buttonsObj[2].sound, buttonsObj[2].active);
            }
            if (e.target.id === 'yellow') {
                buttonFunc(e.target, buttonsObj[3].sound, buttonsObj[3].active);
            }

            playerMove(buttonID);

            if (playerMoves.length === computerMoves.length && gameStart === true) {
                playerCounter++;
                console.log('compteur joueur:', playerCounter);
                if (playerCounter !== 20) {
                    setTimeout(function () {
                        computerMove();
                    }, delay);
                } else {
                    winnerMsg();
                }
            }
        }

        // Permet de comparer les choix du joueur et de l'ordinateur
        arraysEqual(playerMoves, computerMoves);

    }
}

function playSound(e) {
    e.play();
}

function updateCount() {
    counter++;
    display.innerHTML = counter;
}

function computerRandom() {

    // Génère un nombre aleatoire
    let rand = Math.floor(Math.random() * 4);

    setTimeout(function () {
        buttonFunc(buttonsObj[rand].button, buttonsObj[rand].sound, buttonsObj[rand].active);
        computerMoves.push(buttonsObj[rand].idx);
        console.log('tour de lordinateur:', computerMoves);
        if (counter === 0) {
            updateCount();
            console.log('compteur:', counter);
        }
        turn = true;
        console.log('tour:', turn);
    }, delay);
}

function computerMove() {

    if (gameStart) {
        playerMoves = [];

        let offset = 0;
        turn = false;
        console.log('tour:', turn);
        if (counter > 0) {
            updateCount();
            console.log('compteur:', counter);
        }

        computerMoves.forEach(function (e) {
            setTimeout(function () {
                buttonFunc(buttonsObj[e].button, buttonsObj[e].sound, buttonsObj[e].active);
            }, delay + offset);
            offset += delay;
        });

        setTimeout(function () {
            computerRandom();
        }, offset);

    }
}

function playerMove(id) {

    playerMoves.push(id);
    console.log('tour du joueur:', playerMoves);

}

function fail() {
    console.log('erreur');
    gameStart = false;
    if (gameStart) {
        display.innerHTML = '!!';
        playSound(buttonsObj[0].sound);
        playSound(buttonsObj[1].sound);
        playSound(buttonsObj[2].sound);
        playSound(buttonsObj[3].sound);

        setTimeout(function () {
            softReset();
        }, delay);
    } else {
        display.innerHTML = '!';
        let offset = 0;
        turn = false;
        playerMoves = [];

        setTimeout(function () {
            computerMoves.forEach(function (e) {
                setTimeout(function () {
                    buttonFunc(buttonsObj[e].button, buttonsObj[e].sound, buttonsObj[e].active);
                }, delay + offset);
                offset += delay;
            });
        }, delay);

        setTimeout(function () {
            display.innerHTML = counter;
            turn = true;
            gameStart = true;
        }, delay);
    }
}

function arraysEqual(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            fail();
        }
    }
}

startBtn.addEventListener('click', () => {
    if (gameStart === false) {
        gameStart = true;
        console.log('gameStart:', gameStart);
        computerRandom();
    }
});

restartBtn.addEventListener('click', () => {
    if (gameStart === true) {
        gameStart = false;
        display.innerHTML = '--';
        console.log('gameRestart:', gameStart);
    }
});

rules.addEventListener('click', () => {
    document.querySelector('#rules-img').style.display = none;
});


function softReset() {

    gameStart = false;
    turn = false;
    counter = 0;
    playerCounter = 0;
    display.innerHTML = '--';
    playerMoves = [];
    computerMoves = [];
    console.clear();

}

function resetGame() {
    gameOn = false;
    gameStart = false;
    turn = false;
    counter = 0;
    playerCounter = 0;
    display.innerHTML = '--';
    playerMoves = [];
    computerMoves = [];
    console.clear();
}