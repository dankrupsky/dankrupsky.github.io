document.querySelector("#generate").addEventListener("click", generate);
let container = document.querySelector("#matrix");



function generate() {
    let size = parseInt(document.querySelector("#size").value);
    let res = [];
    let initial = [];
    let rotated = [];

    // initial matrix
    for (let i = 0; i < size; i++) {
        let newRow = [];
        for (let j = 0; j < size; j++) {
            newRow.push([i, j]);
        }
        initial.push(newRow);
    }

    // rotate (counter clock 90)
    // for (let i = 0; i < size; i++) {
    //     let newRow = [];
    //     for (let j = size - 1; j > -1; j--) {
    //         newRow.push(initial[j][i]);
    //     }
    //     rotated.push(newRow);
    // }

    // rotate (clocl 90)
    
    for (let i = size - 1; i > -1; i--) {
        let newRow = [];
        for (let j = 0; j < size; j++) {
            newRow.push(initial[j][i]);
        }
        rotated.push(newRow);
    }

    // calculate diff
    for (let i = 0; i < size; i++) {
        let newRow = [];
        for (let j = 0; j < size; j++) {
            deltaY = rotated[i][j][0] - initial[i][j][0]; 
            deltaX = rotated[i][j][1] - initial[i][j][1];
            newRow.push([deltaY, deltaX]);
            
        }
        res.push(newRow);
    }

    // print
    let resString = '';
    for (let i = 0; i < size; i++) {
        resString += "[";
        for (let j = 0; j < size; j++) {
            resString += `[${res[i][j]}], `
        }
        resString = resString.substring(0, resString.length - 2) + '],\n';
    }
    container.innerHTML = resString;


    // console.log(initial.toString());
    // console.log(rotated.toString());
    // console.log(res.toString());
}

/*
Why do we rotate the matrix 90 degrees counter-clockwise here to get clockwise rotation of a figure (e.g. in the my implementation of tetris)?
Because of coords. We compute delta coords for each point, a difference between rotated and initial matrices, then we add them to the correspondent points.
Point at 0,0 in 2x2 matrix:
[0, 0] - (ccwr90) -> [0, 1]
diff = [0, 1]
After applying rotation matrix to a figure:
[0, 0] + (delta) [0, 1] = [0, 1].
In other words: we create bijection: I -f-> R.
where f is a function that transform every element at A[i, j] to B[i, j],
that's why we need to rotate matrix "backwards".
Also we always substract rotated from initial, not the other way around,
because we need to operate form initial (correct) coords to the new ones.
*/
