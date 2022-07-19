let R = Math.floor(Math.random() * 255);
let G = Math.floor(Math.random() * 255);
let B = Math.floor(Math.random() * 255);
const speedSpread = 4;
// range [1, speedSpread]
let Rrate = Math.floor(Math.random() * speedSpread) + 1;
let Grate = Math.floor(Math.random() * speedSpread) + 1;
let Brate = Math.floor(Math.random() * speedSpread) + 1;



function setBackgroundColor() {
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}


function update() {
    R = R + Rrate;
    if (R > 255 || R < 0) {
        Rrate = -Rrate;
        R = R + Rrate;
    }
    G = G + Grate;
    if (G > 255 || G < 0) {
        Grate = -Grate;
        G = G + Grate;

    }
    B = B + Brate;
    if (B > 255 || B < 0) {
        Brate = -Brate;
        B = B + Brate;
    }
    setBackgroundColor();
}


setInterval(update, 50);
