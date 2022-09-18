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
        value2: "gal (UK)",
        c: 0.219969,
    },

    3: {
        value1: "l",
        value2: "gal (US)",
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

    8: {
        value1: "km",
        value2: "miles",
        c: 0.621371,
    },

    9: {
        value1: "tbsp",
        value2: "ml",
        c: 14.7868,
    },

    10: {
        value1: "cups",
        value2: "ml",
        c: 236.588,
    },

    11: {
        value1: "drops",
        value2: "ml",
        c: 0.05,
    },

    12: {
        value1: "psi",
        value2: "atm",
        c: 0.068046,
    },

    14: {
        value1: "tsp",
        value2: "ml",
        c: 4.92892,
    }
};


const polynomial = {
    301: {
      value1: "°C",
      value2: "°F",
      straight: (e) => { return (e * 9 / 5) + 32 },
      reverse: (e) => { return (e - 32) * 5 / 9 },
    },

};


function addConversionDiv(valOne, valTwo, item) {
    let newDivBlock = document.createElement('div');
    newDivBlock.setAttribute("class", "conversion-block");
    let t = document.createElement('p');
    let v = document.createElement('input');
    t.textContent = valOne + " -> " + valTwo;
    v.setAttribute("id", item);
    v.setAttribute("disabled", true);
    newDivBlock.appendChild(t);
    newDivBlock.appendChild(v);
    containerDiv.appendChild(newDivBlock);
    t = document.createElement('p');
    v = document.createElement('input');
    t.textContent = valTwo + " -> " + valOne;
    v.setAttribute("id", item + "r");
    v.setAttribute("disabled", true);
    newDivBlock.appendChild(t);
    newDivBlock.appendChild(v);
    containerDiv.appendChild(newDivBlock);
}


function init() {
    // constant
    for (let item in coefficients) {
        addConversionDiv(coefficients[item]["value1"], coefficients[item]["value2"], item);
    }

    // polynomial
    for (let item in polynomial) {
        addConversionDiv(polynomial[item]["value1"], polynomial[item]["value2"], item);
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


