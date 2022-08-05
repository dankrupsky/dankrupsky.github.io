class FloatingColor {
    constructor(min = 1, max = 3) {
        this.minSpeed = min;
        this.maxSpeed = max;
        this.RGB = [];
        this.rates = [];
        for (let i = 0; i < 3; i++) {
            this.RGB.push(Math.floor(Math.random() * 256));
            this.rates.push(this.getNewRate([1, -1][Math.floor(Math.random() * 2)]));
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


let rgb = new FloatingColor(1, 3);
setBackgroundColor();
setInterval(update, 40);
