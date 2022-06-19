const fieldHeight = 20; // 20
const fieldWidth = 10; // 10
const spawnHeight = 4; // max height of a figure
const gameField = [];
const fEmpty = '*';
const fBlock = 'X';

// Html hook
const gameFieldDiv = document.getElementById("gamefield"); 

class GameField {
    constructor(width, height, spawnHeight) {
        this.width = width;
        this.height = height;
        this.actualHeight = height + spawnHeight;
        this.spawnHeight = spawnHeight;
        this.field = [];
        // [y, x]
        for (let i = 0; i < this.actualHeight; i++) {
            let newRow = [];
            for (let j = 0; j < this.width; j++) {
                newRow.push(fEmpty);
            }
            this.field.push(newRow);
        }
        this.currentFigure = null;
    }

    moveFigure(vector) {
        // Erase
        for (let coords of this.currentFigure.coords) {
            this.field[coords[0]][coords[1]] = fEmpty;
        }
        for (let coords of this.currentFigure.coords) {
            coords[0] += vector[0];
            coords[1] += vector[1];
            this.field[coords[0]][coords[1]] = fBlock;
        }
    }

    spawnFigure(figure) {
        this.currentFigure = new Figure([[0, 0], [0, 1], [1, 0], [1, 1]], 2, 2);
        for (let coords of this.currentFigure.coords) {
             coords[0] = coords[0] + 4 - this.currentFigure.height;
         }
    }

    canMove() {

    }

    getString() {
        let str = "";
        for (let i = spawnHeight; i < this.actualHeight; i++) {
            for(let j = 0; j < this.width; j++) {
                str += this.field[i][j];
            }
            str += '\r\n';
        }
        return str;
    }


}

class Figure {
    coords = [];
    constructor(coordSet, height, width) {
        this.coords = coordSet;
        this.height = height;
        this.width = width;
    }
}

class Figures {
    static getRandomFigure() {
        return [
            [0, 0], [0, 1], [1, 0], [1, 1]
        ]
    }
}



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


function render() {
    gameFieldDiv.textContent = gf.getString();

}


function collisionCheck(direction) {
    // 0 - finalize, 1 - allow, -1 - disallow
}

function rotateFigure() {

}

function move(e) {
    // console.log(e);
    switch (e) {
        case "ArrowRight":
            gf.moveFigure([0, 1]);
            console.log(e);
            break;
        case "ArrowLeft":
            gf.moveFigure([0, -1]);
            console.log(e);
            break;
        case "ArrowUp":
            console.log(e);
            break;
        case "ArrowDown":
            gf.moveFigure([1, 0]);
            pos.x--;
            break;
        case " ":
            console.log(e);
            break;
    }
}

function init() {
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


let gf = new GameField(fieldWidth, fieldHeight, spawnHeight);
gf.spawnFigure();
init();
setInterval(render, 200);