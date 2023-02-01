const result = document.querySelector('.result');
const calculation = document.querySelector('.calculation');
let clearResult = false;
let calculationOff = false;
let firstNum = 0;
let secondNum = 0;
let total = 0;

document.addEventListener('keydown', event => KeyEvent(event.key));
document.querySelector('.clear').addEventListener('click', () => clearDisplay());
document.querySelector('.clearEntry').addEventListener('click', () => clearEntryDisplay());
document.querySelector('.backspace').addEventListener('click', () => eraseNum());
document.querySelector('.changeSignal').addEventListener('click', () => changeSignal());
document.querySelector('.dot').addEventListener('click', () => dotHandler());

document.querySelectorAll('.numbers').forEach(btn => btn.addEventListener('click', event => {
    resultNumber(event.target.innerHTML)
}));

document.querySelectorAll('.operations').forEach(btn => btn.addEventListener('click', event => {
    operations(event.target.innerHTML)
}));


// Display cleaner buttons 
function clearDisplay() {
    result.innerHTML = 0;
    calculation.innerHTML = 0;
    clearResult = false;
    calculationOff = false;
    firstNum = 0;
    secondNum = 0;
    total = 0;
};

function clearEntryDisplay() {
    result.innerHTML = 0
};

function eraseNum() {
    let erased = result.innerHTML.replace(/.$/,'');
    erased === ''? result.innerHTML = 0: result.innerHTML = erased
};


//Handles all the equal button functionalities
function equalHandler() {

    if (!calculation.innerHTML.includes('=')) {
        secondNum = Number(result.innerHTML);
        calculation.innerHTML = `${calculation.innerHTML} ${secondNum}=`;
        total = doMath(firstOperator);
        if (total > 9999999999) total = total.toExponential(5);
        result.innerHTML = total;
        firstNum = total;

        calculationOff = true;
        clearResult = true;

    } else {
        calculation.innerHTML = `${firstNum} ${firstOperator} ${secondNum}=`;
        firstNum = doMath(firstOperator);
        if (firstNum > 9999999999) firstNum = firstNum.toExponential(5)  
        result.innerHTML = firstNum;
    }
}


// Manage numbers that are being written to result display 
function resultNumber(number) {

    if (result.innerHTML.length === 10 && clearResult === false) return 
    if (calculation.innerHTML.includes('=')) clearDisplay();

    if (result.innerHTML === '0' || clearResult === true) {
        clearResult = false;
        result.innerHTML = number;

    } else {
        result.innerHTML = `${result.innerHTML}${number}`;
    };

    calculationOff = false;
}

function changeSignal() {
    if (result.innerHTML.startsWith('-')) {
        result.innerHTML = result.innerHTML.slice(1)
    } else {
        result.innerHTML = `-${result.innerHTML}`
    }
}

function dotHandler() {
    if (!result.innerHTML.includes('.')) result.innerHTML = `${result.innerHTML}.`;       
}


// Add numbers to calculation display 
function toCalculation(number, operator) {
    firstNum = number;
    firstOperator = operator;
    total = 0;

    calculation.innerHTML = `${firstNum} ${firstOperator}`
}


// Decides when to do the math operations
function operations(operator) {
    
    let resultNumber = Number(result.innerHTML)
    if (calculationOff === true) return toCalculation(firstNum, operator)

    if (calculation.innerHTML === '0') {
        firstNum = resultNumber;
        firstOperator = operator;

        toCalculation(firstNum, firstOperator);

    } else {
        secondNum = resultNumber;
        total = doMath(firstOperator);
        if (total > 9999999999) total = total.toExponential(5)
        result.innerHTML = total;
        toCalculation(total, operator);
        calculationOff = true;
    }
    
    clearResult = true;
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
            return divide(a, b)
        case 'x':
            return multiply(a, b)
        default:
            return 0  
    }
}


// keyboard handlers 
function KeyEvent(key) {

    if (Number.isInteger(Number(key))) resultNumber(key);

    switch (key) {
        case 'Backspace':
            return eraseNum()
        case 'Delete':
            return clearEntryDisplay();  
        case 'Enter':
            return equalHandler()
        case '+':
            return operations('+');
        case '-':
            return operations('-');
        case '/':
            return operations('/');
        case '*':
            return operations('x');
        case '.':
            return dotHandler();
        case ',':
            return dotHandler();
    }
}