class FloatingColor {
    constructor(min = 1, max = 3) {
        this.R = Math.floor(Math.random() * 256);
        this.G = Math.floor(Math.random() * 256);
        this.B = Math.floor(Math.random() * 256);
        this.minSpeed = min;
        this.maxSpeed = max;
        this.Rrate = this.getNewRate();
        this.Grate = this.getNewRate();
        this.Brate = this.getNewRate();
    }

    getNewRate(currentRate = -1) {
        // range [minSpeed, maxSpeed]
        // + sign by default, invert sign if argument is used
        const rangeLength = this.maxSpeed - this.minSpeed + 1; 
        return -Math.sign(currentRate) * (Math.floor(Math.random() * rangeLength) + this.minSpeed);
    }

    update() {
        this.R = this.R + this.Rrate;
        if (this.R > 255 || this.R < 0) {
            this.R = this.R - this.Rrate;
            this.Rrate = this.getNewRate(this.Rrate);
            
        }
    
        this.G = this.G + this.Grate;
        if (this.G > 255 || this.G < 0) {
            this.G = this.G - this.Grate;
            this.Grate = this.getNewRate(this.Grate);
    
        }
    
        this.B = this.B + this.Brate;
        if (this.B > 255 || this.B < 0) {
            this.B = this.B - this.Brate;
            this.Brate = this.getNewRate(this.Brate)
        }
    }
}


function setBackgroundColor(R, G, B) {
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

function update() {
    rgb.update();
    setBackgroundColor(rgb.R, rgb.G, rgb.B);
}


let rgb = new FloatingColor(1, 3);
setBackgroundColor();
setInterval(update, 40);
