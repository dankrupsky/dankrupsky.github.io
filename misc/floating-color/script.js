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
    colorsDiv.style.backgroundColor = `rgba(${R}, ${G}, ${B}, ${brightnessAlpha})`;
}

function update() {
    rgb.update();
    setBackgroundColor(rgb.RGB[0], rgb.RGB[1], rgb.RGB[2]);
}


// Slider
const slider = document.getElementById("slider-speed");
const sliderLabel = document.getElementById("speed-label");
slider.onchange = function() {
    clearInterval(speedSIID);
    const newVal = slider.value;
    speedSIID = setInterval(update, (1000 / newVal));
    sliderLabel.textContent = newVal;
}


// Brightness
const brightnessSlider = document.getElementById("brightness");
const brightnessLabel = document.getElementById("brightness-label");
let brightnessAlpha = brightnessSlider.value / 100;
brightnessLabel.textContent = brightnessSlider.value;
brightnessSlider.onchange = function() {
    brightnessAlpha = brightnessSlider.value / 100;
    brightnessLabel.textContent = brightnessSlider.value;
}


// Fullscreen Events
const fullscreenButton = document.getElementById("fullscreen-button");
fullscreenButton.textContent = "Go Fullscreen";
fullscreenButton.addEventListener("click", toggleFullScreen);

function hideControls() {
    controlsDiv.classList.remove("add-animation");
    controlsDiv.classList.add("remove-animation");
    document.body.requestPointerLock();
}

function showControls() {
    controlsDiv.classList.remove("remove-animation");
    controlsDiv.classList.add("add-animation");
    document.exitPointerLock();
}

function toggleFullScreen() {
    if( window.innerHeight == screen.height) {
        document.exitFullscreen();
        fullscreenButton.textContent = "Go Fullscreen";
        fullscreenButton.style.backgroundColor = "#A3E4D7";
        
    } else {
        document.documentElement.requestFullscreen();
        fullscreenButton.textContent = "Exit Fullscreen";
        fullscreenButton.style.backgroundColor = "#F5B7B1";
    }  
}

// Mouse not moving auto hiding controls
let timeout;
timeout = setTimeout(hideControls, 2000);
function resetControlsFadeTimer() {
    clearTimeout(timeout);
    showControls();
    timeout = setTimeout(hideControls, 2000);
}

document.onmousemove = resetControlsFadeTimer;


// Init
const colorsDiv = document.getElementById("colors");
let rgb = new FloatingColor(1, 3);
setBackgroundColor();
let speedSIID = setInterval(update, slider.value);
sliderLabel.textContent = slider.value;
const controlsDiv = document.querySelector(".controls");
resetControlsFadeTimer();
