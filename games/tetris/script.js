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
]


function init() {
    for (let i = 0; i < fieldHeight + spawnHeight; i++) {
        newFieldLine = [];
        for (let j = 0; j < fieldWidth; j++) {
            newFieldLine.push(fEmpty);
        }
        gameField.push(newFieldLine);
    }
}

// To do later
function render(container) {
    
    for (let i = 9; i > -1; i--) {
        for(let j = 9; j > -1; j--) {
            console.log("smtg");
            container.textContent += gameField[i][j];
        }
        container.textContent += '\r\n';
    }
}



init();
render(gameFieldDiv);
