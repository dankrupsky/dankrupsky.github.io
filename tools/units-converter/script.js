const initValue = document.getElementById("initial-value");
const containerDiv = document.getElementById("container");

initValue.addEventListener("input", checkInput);
initValue.addEventListener("input", update);

function checkInput() {
    initValue.value = initValue.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
}

// 1 unit for test, kg to pounds
const kg = document.createElement('input');
const kg2pC = 2.20462;
containerDiv.appendChild(kg);

function update() {
    kg.value = initValue.value * kg2pC;
}



