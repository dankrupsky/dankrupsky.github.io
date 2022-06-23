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


    console.log(initial.toString());
    console.log(rotated.toString());
    console.log(res.toString());
}
