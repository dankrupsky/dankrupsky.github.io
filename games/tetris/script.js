const fieldHeight = 20; // 20
const fieldWidth = 10; // 10
const spawnHeight = 4; // max height of a figure
const gameField = [];
const fEmpty = '*';
const fBlock = 'X';
const fFigureBlock = 'H';
let gf = null;
let tetrisInstance = null;

// Html hook
const gameFieldDiv = document.getElementById("gamefield");
const levelDiv = document.getElementById("level");
const scoreDiv = document.getElementById("score");
const isPlayingDiv = document.getElementById("status");

class GameField {
    constructor(width, height, spawnHeight) {
        this.width = width;
        this.height = height;
        this.actualHeight = height + spawnHeight;
        this.spawnHeight = spawnHeight;
        this.field = [];
        this.linesCleared = 0;
        this.blocksCleared = 0;
        this.isPlaying = true;
        this.figcol = new Figures();
        // [y, x]
        for (let i = 0; i < this.actualHeight; i++) {
            let newRow = [];
            for (let j = 0; j < this.width; j++) {
                newRow.push(fEmpty);
            }
            this.field.push(newRow);
        }
        this.currentFigure = null;

        // First figure
        this.spawnFigure();
    }

    moveFigure(vector) {
        // Erase
        if (this.canMove(vector)) {
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

    clearFigure(toClear = this.currentFigure.coords) {
        for (let b of toClear) {
            this.field[b[0]][b[1]] = fEmpty;
        }
    }

    drawFigure(toClear = this.currentFigure.coords) {
        for (let b of toClear) {
            this.field[b[0]][b[1]] = fFigureBlock;
        }
    }

    dropDown() {
        while (this.canMove([1, 0])) {
            this.moveFigure([1, 0]);
        }
        this.moveFigure([1, 0]); // finalize
    }

    finalizeFigure() {
        for (let coords of this.currentFigure.coords) {
            this.field[coords[0]][coords[1]] = fBlock;
            if (coords[0] < this.spawnHeight) {
                this.isPlaying = false;  // game over
            }
        }
        this.checkLines();
        this.spawnFigure();
    }

    spawnFigure() {
        if (this.isPlaying) {
            let newFigCoordSet = this.figcol.getRandomFigure();
            this.currentFigure = new Figure(newFigCoordSet, this);
            const xCenter =  Math.floor(this.width / 2) - Math.floor(this.currentFigure.width / 2);
            for (let coords of this.currentFigure.coords) {
                coords[0] = coords[0] + 4 - this.currentFigure.height;
                coords[1] += xCenter;
            }
        }
    }

    canMove(vector, figureCoords = this.currentFigure.coords) {
        for (let coords of figureCoords) {
            let newY = coords[0] + vector[0];
            let newX = coords[1] + vector[1];
            if ((newY < 0) || (newX < 0) || (newX > this.width - 1) || (newY > this.actualHeight - 1) || (this.field[newY][newX] == fBlock) ) {
                return false;
            }
        }

        return this.isPlaying;
    }

    rotate() {
        let c = this.currentFigure;
        this.clearFigure();
        c.rotateNinety();
        this.drawFigure();

    }

    checkLines() {
        // Check every line, record cleared
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

        

        // Remove cleared lines, shift upper lines down
        if (linesToRemove.length) {
            let lowestLine = linesToRemove[linesToRemove.length - 1]
            let linesToMoveDown = 0;
            for (let i = lowestLine; i > this.spawnHeight - 1; i--) {
                if (linesToRemove.includes(i)) {
                    for (let j = 0; j < this.width; j++) {
                        this.field[i][j] = fEmpty;
                    } 
                    linesToMoveDown++;
                    this.linesCleared++;
                    this.blocksCleared += this.width;
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
            str += '\n';
        }
        return str;
    }

    getClearedBlocks() {
        return this.blocksCleared;
    }


}

class Figure {
    coords = [];
    width;
    height;
    maxY;
    maxX;
    minY;
    minX;
    rotateMatrix = [
        [[0,3], [1,2], [2,1], [3,0]],
        [[-1,2], [0,1], [1,0], [2,-1]],
        [[-2,1], [-1,0], [0,-1], [1,-2]],
        [[-3,0], [-2,-1], [-1,-2], [0,-3]],
    ];
    constructor(coordSet, parentfield) {
        this.coords = coordSet;
        this.gameField = parentfield;
        this.updateSize();
        
    }

    updateSize() {
        let c = this.coords;
        let minY = c[0][0];
        let minX = c[0][1];
        let maxY = minY;
        let maxX = minX;
        for (let i = 1; i < c.length; i++) {
            if (c[i][0] < minY) {
                minY = c[i][0];
            }
            if (c[i][1] < minX) {
                minX = c[i][1]
            }

            if (c[i][0] > maxY) {
                maxY = c[i][0];
            }
            if (c[i][1] > maxX) { 
                maxX = c[i][1]
            }   
        }

        this.width = maxX - minX + 1;
        this.height = maxY - minY + 1;
        this.maxY = maxY;
        this.maxX = maxX;
        this.minY = minY;
        this.minX = minX;
    }

    rotateNinety() {
        this.updateSize();
        let mSide = this.width > this.height ? this.width : this.height;
        let newCoordSet = [];
        let c = this.coords;
        let newMaxY = null;
        let newMinX = null;
        // rotate 90 degrees
        for (let i = 0; i < mSide; i++) {
            let cy = i + this.minY;
            for (let j = 0; j < mSide; j++) {
                let cx = j + this.minX;
                for (let tc of c) {
                    if ((tc[0] == cy) && (tc[1] == cx)) {   
                        let mewy = cy + this.rotateMatrix[i][j][0];                  
                        let mewx = cx + this.rotateMatrix[i][j][1];

                        newCoordSet.push([mewy, mewx]);

                        if (newMaxY == null) {
                            newMaxY = mewy;
                        }
                        if (newMinX == null) {
                            newMinX = mewx;
                        }

                        if (newMaxY && newMaxY < mewy) {
                            newMaxY = mewy;
                        }
                        if (newMinX && newMinX > mewx) {
                            newMinX = mewx;
                        }
                    }
                }
                
            }
        }
        
        // fixing position (same left-bottom anchor point)
        const deltaY = this.maxY - newMaxY;
        const deltaX = this.minX - newMinX;

        for (let point of newCoordSet) {
            point[0] += deltaY;
            point[1] += deltaX;
        }

        if (this.gameField.canMove([0, 0], newCoordSet)) {
            this.coords = newCoordSet;
        }
        
    }
}

class Figures {
    figCol = [
        [[0, 0], [0, 1], [1, 0], [1, 1]],  // square
        [[0, 0], [1, 0], [2, 0], [3, 0]],  // line
        [[0, 0], [1, 0], [2, 0], [1, 1]],  // tri-right
        [[1, 0], [0, 1], [1, 1], [2, 1]],  // tri-left
        [[1, 0], [1, 1], [0, 1], [0, 2]],  // z-right
        [[0, 0], [0, 1], [1, 1], [1, 2]],  // z-left
        [[0, 0], [1, 0], [2, 0], [2, 1]],  // L-right
        [[2, 0], [2, 1], [1, 1], [0, 1]],  // L-left
    ];
    getRandomFigure() {
        let rnd = Math.floor(Math.random() * this.figCol.length);
        let copyCoords = structuredClone(this.figCol[rnd]);
        return copyCoords;
    }
}

function move(e) {
    switch (e) {
        case "ArrowRight":
            gf.moveFigure([0, 1]);
            break;
        case "ArrowLeft":
            gf.moveFigure([0, -1]);
            break;
        case "ArrowUp":
            gf.rotate();
            break;
        case "ArrowDown":
            gf.moveFigure([1, 0]);
            break;
        case " ":
            gf.dropDown();
            break;
    }
}

class Tetris {
    intervalID;
    constructor() {
        this.gameField = new GameField(fieldWidth, fieldHeight, spawnHeight);
        this.currentLevel = 1;
        this.linesPerlevel = 5;
        this.initSpeed = 600;
    }

    start() {
        this.resume(this.initSpeed);
    }

    resume(t) {
        this.intervalID = setInterval(this.tick.bind(this), t);
    }

    stop(id) {
        clearInterval(id);
    }

    getSpeed() {
        this.currentLevel++;
        return (this.initSpeed - this.currentLevel * 50);
    }

    tick() {
        if (this.gameField.isPlaying) {
            this.gameField.moveFigure([1, 0]);
            if (this.gameField.linesCleared >= (this.currentLevel * this.linesPerlevel)) {
                this.stop(this.intervalID);
                this.resume(this.getSpeed());
            }
        } else {
            this.stop(this.intervalID);
        }

        // Speed update
    }

    isPlaying() {
        return this.gameField.isPlaying;
    }
    
}

function init() {
    // Controls
    document.addEventListener('keydown', function(event) {
        move(event.key);
    });
    
    tetrisInstance = new Tetris();
    gf = tetrisInstance.gameField;
    tetrisInstance.start();
}


function render() {
    gameFieldDiv.textContent = gf.getString();
    levelDiv.textContent = tetrisInstance.currentLevel;
    scoreDiv.textContent = gf.blocksCleared;
    isPlayingDiv.innerHTML = tetrisInstance.isPlaying() ? '<span style="color: green">Playing</span>' : '<span style="color: red">Game Over</span>';
}




init();
setInterval(render, 50);
