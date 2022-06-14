const inInput = document.getElementById("in");
const outInput = document.getElementById("out");

inInput.addEventListener("paste", invert);

const keysArray = '~!@#$%^&QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?`qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./Ё!"№;%:?ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/ЯЧСМИТЬБЮ,ёйцукенгшщзхъфывапролджэ\\ячсмитьбю.';
const length = keysArray.length;

function invert(e) {
    outInput.value = "";
    console.log(navigator.clipboard.readText());
    for (let i of inInput.value) {
        let keyIndex = keysArray.indexOf(i);
        if (keyIndex) {
            outInput.value += keysArray[((keyIndex + (length / 2)) % length)];
        } else {
            outInput.value += e.key;
        }
    }  
}