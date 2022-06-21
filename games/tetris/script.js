const fieldHeight = 20; // 20
const fieldWidth = 10; // 10
const spawnHeight = 4; // max height of a figure
const gameField = [];
const fEmpty = '*';
const fBlock = 'X';
const fFigureBlock = 'H';

// Html hook
const gameFieldDiv = document.getElementById("gamefield"); 

class GameField {
    constructor(width, height, spawnHeight) {
        this.width = width;
        this.height = height;
        this.actualHeight = height + spawnHeight;
        this.spawnHeight = spawnHeight;
        this.field = [];
        this.score = 0;
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
        if (this.canMove(vector, this.currentFigure)) {
            for (let coords of this.currentFigure.coords) {
                this.field[coords[0]][coords[1]] = fEmpty;
            }
            for (let coords of this.currentFigure.coords) {
                coords[0] += vector[0];
                coords[1] += vector[1];
                this.field[coords[0]][coords[1]] = fFigureBlock;
            }
        } else if (vector[0] == 1 && vector[1] == 0) {
            this.finalizeFigure();
        }
    }

    dropDown() {
        while (this.canMove([1, 0], this.currentFigure)) {
            this.moveFigure([1, 0]);
        }
        this.moveFigure([1, 0]); // finalize
    }

    finalizeFigure() {
        for (let coords of this.currentFigure.coords) {
            this.field[coords[0]][coords[1]] = fBlock;
        }
        this.checkLines();
        this.spawnFigure();
    }

    spawnFigure() {
        this.currentFigure = new Figure([[0, 0], [0, 1], [1, 0], [1, 1]], 2, 2);
        for (let coords of this.currentFigure.coords) {
             coords[0] = coords[0] + 4 - this.currentFigure.height;
         }
    }

    canMove(vector) {
        for (let coords of this.currentFigure.coords) {
            let newY = coords[0] + vector[0];
            let newX = coords[1] + vector[1];
            if ((newY < 0) || (newX < 0) || (newX > this.width - 1) || (newY > this.actualHeight - 1) || (this.field[newY][newX] == fBlock) ) {
                return false;
            }
        }
        return true;
    }

    checkLines() {
        let linesToRemove = [];
        for (let i = this.spawnHeight - 1; i < this.actualHeight; i++) {
            let completeLine = true;
            for (let j = 0; j < this.width; j++) {
                if (this.field[i][j] != fBlock) {
                    completeLine = false;
                    break;
                }
            }
            if (completeLine) {
                linesToRemove.push(i);
            }
        }

        


        if (linesToRemove.length) {
            let lowestLine = linesToRemove[linesToRemove.length - 1]
            let linesToMoveDown = 0;
            for (let i = lowestLine; i > this.spawnHeight - 1; i--) {
                if (linesToRemove.includes(i)) {
                    for (let j = 0; j < this.width; j++) {
                        this.field[i][j] = fEmpty;
                    } 
                    linesToMoveDown++;
                } else {
                    for (let j = 0; j < this.width; j++) {
                        this.field[i+linesToMoveDown][j] = this.field[i][j];
                        this.field[i][j] = fEmpty;
                    }
                }   
            }
            this.score += linesToMoveDown;
        }
        
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
            gf.dropDown();
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