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
        value2: "pounds",
        c: 2.20462,
    }
};

function init() {
    for (let item in coefficients) {
        // straight
        let t = document.createElement('p');
        let v = document.createElement('input');
        t.textContent = coefficients[item]["value1"] + "2" + coefficients[item]["value2"];
        v.setAttribute("id", item);
        containerDiv.appendChild(t);
        containerDiv.appendChild(v);
        // reverse
        t = document.createElement('p');
        v = document.createElement('input');
        t.textContent = coefficients[item]["value2"] + "2" + coefficients[item]["value1"];
        v.setAttribute("id", item + "r");
        containerDiv.appendChild(t);
        containerDiv.appendChild(v);
    }
}



function update() {
    for (let item in coefficients) {
        // straight
        let v = document.getElementById(item);
        v.value = initValue.value * coefficients[item]["c"];
        // reverse
        v = document.getElementById(item + "r");
        v.value = initValue.value / coefficients[item]["c"];
    }
}

init();
update();


