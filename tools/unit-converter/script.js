const initValue = document.getElementById("initial-value");
const containerDiv = document.getElementById("container");

initValue.addEventListener("input", checkInput);
initValue.addEventListener("input", update);

function checkInput() {
    initValue.value = initValue.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
}

const coefficients = {
    1: {
        value1: "kg",
        value2: "pounds (lb)",
        c: 2.20462,
    },

    2: {
        value1: "l",
        value2: "gallonImperial",
        c: 0.219969,
    },

    3: {
        value1: "l",
        value2: "gallonUSLiquid",
        c: 0.264172,
    },

    4: {
        value1: "m",
        value2: "feet",
        c: 3.28084,
    },

    5: {
        value1: "kg",
        value2: "oz",
        c: 35.274,
    },

    6: {
        value1: "cm",
        value2: "inches",
        c: 0.393701,
    },

    7: {
        value1: "feet",
        value2: "inches",
        c: 12,
    },
};

const polynomial = {
    301: {
      value1: "°C",
      value2: "°F",
      straight: (e) => { return (e * 9 / 5) + 32 },
      reverse: (e) => { return (e - 32) * 5 / 9 },
    },

};

function init() {
    // constant
    for (let item in coefficients) {
        // straight
        let newDivBlock = document.createElement('div');
        newDivBlock.setAttribute("class", "conversion-block");
        let t = document.createElement('p');
        let v = document.createElement('input');
        t.textContent = coefficients[item]["value1"] + " -> " + coefficients[item]["value2"];
        v.setAttribute("id", item);
        newDivBlock.appendChild(t);
        newDivBlock.appendChild(v);
        containerDiv.appendChild(newDivBlock);
        // reverse
        t = document.createElement('p');
        v = document.createElement('input');
        t.textContent = coefficients[item]["value2"] + " -> " + coefficients[item]["value1"];
        v.setAttribute("id", item + "r");
        newDivBlock.appendChild(t);
        newDivBlock.appendChild(v);
        containerDiv.appendChild(newDivBlock);
    }

    // polynomial
    for (let item in polynomial) {
        // straight
        let newDivBlock = document.createElement('div');
        newDivBlock.setAttribute("class", "conversion-block");
        let t = document.createElement('p');
        let v = document.createElement('input');
        t.textContent = polynomial[item]["value1"] + " -> " + polynomial[item]["value2"];
        v.setAttribute("id", item);
        newDivBlock.appendChild(t);
        newDivBlock.appendChild(v);
        containerDiv.appendChild(newDivBlock);
        // reverse
        t = document.createElement('p');
        v = document.createElement('input');
        t.textContent = polynomial[item]["value2"] + " -> " + polynomial[item]["value1"];
        v.setAttribute("id", item + "r");
        newDivBlock.appendChild(t);
        newDivBlock.appendChild(v);
        containerDiv.appendChild(newDivBlock);
    }
}



function update() {
    // constant conversion
    for (let item in coefficients) {
        // straight
        let v = document.getElementById(item);
        v.value = (initValue.value * coefficients[item]["c"]).toFixed(3);
        // reverse
        v = document.getElementById(item + "r");
        v.value = (initValue.value / coefficients[item]["c"]).toFixed(3);
    }

    // polynomial conversion
    for (let item in polynomial) {
        // straight
        let v = document.getElementById(item);
        v.value = (polynomial[item].straight(initValue.value)).toFixed(3);
        // reverse
        v = document.getElementById(item + "r");
        v.value = (polynomial[item].reverse(initValue.value)).toFixed(3);
    }
}

init();
update();


