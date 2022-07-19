let R = Math.floor(Math.random() * 255);
let G = Math.floor(Math.random() * 255);
let B = Math.floor(Math.random() * 255);
const minSpeed = 2;
const maxSpeed = 5;
let Rrate = getNewRate();
let Grate = getNewRate();
let Brate = getNewRate();


function setBackgroundColor() {
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}


function getNewRate(currentRate = -1) {
    // range [minSpeed, maxSpeed]
    // + sign by default, invert sign if argument is used
    return -Math.sign(currentRate) * (Math.floor(Math.random() * maxSpeed) + minSpeed);
}


function update() {
    R = R + Rrate;
    if (R > 255 || R < 0) {
        R = R - Rrate;
        Rrate = getNewRate(Rrate);
        
    }

    G = G + Grate;
    if (G > 255 || G < 0) {
        G = G - Grate;
        Grate = getNewRate(Grate);

    }

    B = B + Brate;
    if (B > 255 || B < 0) {
        B = B - Brate;
        Brate = getNewRate(Brate)
    }

    console.log(R,G,B);
    setBackgroundColor();
}


setInterval(update, 50);
