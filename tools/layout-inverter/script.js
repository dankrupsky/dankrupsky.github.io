const inInput = document.getElementById("in");
const outInput = document.getElementById("out");

inInput.addEventListener("input", invert);

// minor nuance (bug): . exists in both layout, / (ru) -> . -> ю
const keysArray = '~!@#$%^&QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?`qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./Ё!"№;%:?ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/ЯЧСМИТЬБЮ,ёйцукенгшщзхъфывапролджэ\\ячсмитьбю.';
const keysLength = keysArray.length;

function invert(e) {
    outInput.value = "";
    for (let i of inInput.value) {
        let keyIndex = keysArray.indexOf(i);
        if (keyIndex != -1) {
            outInput.value += keysArray[((keyIndex + (keysLength / 2)) % keysLength)];
        } else {
            outInput.value += i;
        }
    }  
}