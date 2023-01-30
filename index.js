const result = document.querySelector('.result');
const calculation = document.querySelector('.calculation');
let clearResult = false;
let firstOperator = null;
let firstNum = 0;
let secondNum = 0;
let total = 0;

document.querySelector('.clear').addEventListener('click', () => clearDisplay());
document.querySelector('.clearEntry').addEventListener('click', () => clearEntryDisplay());
document.querySelector('.backspace').addEventListener('click', () => eraseNum());
document.querySelector('.changeSignal').addEventListener('click', () => changeSignal());

document.querySelectorAll('.numbers').forEach(btn => btn.addEventListener('click', event => {
    numberToDisplay(event.target.innerHTML)
}))

document.querySelectorAll('.operations').forEach(btn => btn.addEventListener('click', event => {
    operations(event.target.innerHTML)
}))


function clearDisplay() {
    result.innerHTML = 0;
    calculation.innerHTML = 0;
    firstOperator = null;
};

function clearEntryDisplay() {
    result.innerHTML = 0
};

function eraseNum() {
    let erased = result.innerHTML.replace(/.$/,'');
    erased === ''? result.innerHTML = 0: result.innerHTML = erased
};

function changeSignal() {
    if (result.innerHTML.startsWith('-')) {
        result.innerHTML = result.innerHTML.slice(1)
    } else {
        result.innerHTML = `-${result.innerHTML}`
    }
}

function numberToDisplay(number) {
    if (result.innerHTML == 0 || clearResult === true) {
        result.innerHTML = number
        clearResult = false; 

    } else {
        result.innerHTML = `${result.innerHTML}${number}` 
    }
}

function operations(operator) {
    if (calculation.innerHTML == 0) {
        calculation.innerHTML = `${result.innerHTML} ${operator}`
        firstOperator = operator;
        firstNum = Number(result.innerHTML);

    } else {
        secondNum = Number(result.innerHTML);
        total = doMath(firstOperator);
        firstNum = total;
        firstOperator = operator;

        result.innerHTML = total;
        calculation.innerHTML = `${total} ${operator}`;
    }
    clearResult = true
}

// Math operations 
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function divide(a, b) {
    return a / b
}

function multiply(a, b) {
    return a * b
}

function doMath(operator) {

    let a = firstNum;
    let b = secondNum;

    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '/':
            if (b === 0) return null;
            return divide(a, b)
        case 'x':
            return multiply(a, b)
        default:
            return 0  
    }
}