const fieldHeight = 20;
const fieldWidth = 10;
const spawnHeight = 4;
const gameField = [];

const fEmpty = '*';
const fBlock = 'X';

// Html hook
const gameFieldDiv = document.getElementById("gamefield"); 

// Elements
const line = [
    [fBlock],
    [fBlock],
    [fBlock],
    [fBlock],
];

const square = [
    [fBlock, fBlock],
    [fBlock, fBlock],
];

const leftZigZag = [
    [fBlock, fBlock, fEmpty],
    [fEmpty, fBlock, fBlock],
];

const rightZigZag = [
    [fEmpty, fBlock, fBlock],
    [fBlock, fBlock, fEmpty],
];

const triThing = [
    [fEmpty, fBlock, fEmpty],
    [fEmpty, fBlock, fBlock],  
];

const leftLThing = [
    [fBlock, fEmpty],
    [fBlock, fEmpty],
    [fBlock, fBlock],
];

const rightLThing = [
    [fEmpty, fBlock],
    [fEmpty, fBlock],
    [fBlock, fBlock], 
];

const elCollection = [line, square, leftZigZag, rightZigZag, triThing, leftLThing, rightLThing];

let isPlaying = false;
let pos = {
    x: 5,
    y: 5
};
let element = leftZigZag;
let score = 0;
let highScore = 0;


function render(container) {
    for (let i = fieldHeight; i > -1; i--) {
        for(let j = 0; j < fieldWidth; j++) {
            container.textContent += gameField[i][j];
        }
        container.textContent += '\r\n';
    }
}

// To Do - consistent coordinates approach
function update() {
    for (let i = pos.y; i > pos.y - element.length; i--) {
        for (let j = pos.x; j < pos.x + element[0].length; j++) {
            console.log(i, j)
            gameField[i][j] = element[pos.y - i][j - pos.x];
        }
    }
}

function collisionCheck(direction) {
    // 0 - finalize, 1 - allow, -1 - disallow
}

function move(e) {
    // console.log(e);
    switch (e) {
        case "ArrowRight":
            console.log(e);
            break;
        case "ArrowLeft":
            console.log(e);
            break;
        case "ArrowUp":
            console.log(e);
            break;
        case "ArrowDown":
            console.log(e);
            break;
        case " ":
            console.log(e);
            break;
    }
}

function init() {
    for (let i = 0; i < fieldHeight + spawnHeight; i++) {
        newFieldLine = [];
        for (let j = 0; j < fieldWidth; j++) {
            newFieldLine.push(fEmpty);
        }
        gameField.push(newFieldLine);
    }

    // Controls
    document.addEventListener('keydown', function(event) {
        move(event.key);
    });
}

function start() {
    let score = 0;

    let rnd = Math.floor(Math.random() * elCollection.length)
    let element = elCollection[rnd];
    let pos = 21 + element.length;
}






init();
update();
render(gameFieldDiv);