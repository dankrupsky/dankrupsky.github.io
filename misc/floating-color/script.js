class FloatingColor {
    constructor(min = 1, max = 3) {
        this.minSpeed = min;
        this.maxSpeed = max;
        this.RGB = [];
        this.rates = [];
        for (let i = 0; i < 3; i++) {
            this.RGB.push(Math.floor(Math.random() * 256));
            this.rates.push(this.getNewRate((Math.random() - 0.5)));
        }
    }

    getNewRate(currentRate = -1) {
        // range [minSpeed, maxSpeed]
        // plus sign by default
        // invert sign if argument is used
        const rangeLength = this.maxSpeed - this.minSpeed + 1; 
        return -Math.sign(currentRate) * (Math.floor(Math.random() * rangeLength) + this.minSpeed);
    }

    update() {
        for (let i = 0; i < 3; i++) {
            this.RGB[i] = this.RGB[i] + this.rates[i];
            if (this.RGB[i] > 255 || this.RGB[i] < 0) {
                this.RGB[i] = this.RGB[i] - this.rates[i];
                this.rates[i] = this.getNewRate(this.rates[i]); 
            }
        }
    }
};


function setBackgroundColor(R, G, B) {
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

function update() {
    rgb.update();
    setBackgroundColor(rgb.RGB[0], rgb.RGB[1], rgb.RGB[2]);
}


// Slider
const slider = document.getElementById("slider-speed");
const sliderLabel = document.getElementById("slider-label");
slider.onchange = function() {
    clearInterval(speedSIID);
    const newVal = slider.value;
    speedSIID = setInterval(update, newVal);
    sliderLabel.textContent = newVal;
}

let rgb = new FloatingColor(1, 3);
setBackgroundColor();
let speedSIID = setInterval(update, slider.value);
sliderLabel.textContent = slider.value;


// Fullscreen
const fullscreenButton = document.getElementById("fullscreen-button");
fullscreenButton.addEventListener("click", toggleFullScreen);

function toggleFullScreen() {
    if( window.innerHeight == screen.height) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }  
}
