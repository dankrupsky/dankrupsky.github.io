let R = Math.floor(Math.random() * 255);
let G = Math.floor(Math.random() * 255);
let B = Math.floor(Math.random() * 255);
const speedSpread = 4;
let Rrate = Math.floor(Math.random() * speedSpread);
let Grate = Math.floor(Math.random() * speedSpread);
let Brate = Math.floor(Math.random() * speedSpread);



function setBackgroundColor() {
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}


function update() {
    R = R + Rrate;
    if (R > 255 || R < 0) Rrate = -Rrate;
    G = G + Grate;
    if (G > 255 || G < 0) Grate = -Grate;
    B = B + Brate;
    if (B > 255 || B < 0) Brate = -Brate;
    
    setBackgroundColor();
}



setInterval(update, 50);
