const result = document.querySelector('.result');
const calculation = document.querySelector('.calculation');
let clearResult = false;
let firstOperator = null;
let firstNum = 0;
let secondNum = 0;
let total = 0;
let dot = false;

document.addEventListener('keydown', event => KeyEvent(event.key));
document.querySelector('.clear').addEventListener('click', () => clearDisplay());
document.querySelector('.clearEntry').addEventListener('click', () => clearEntryDisplay());
document.querySelector('.backspace').addEventListener('click', () => eraseNum());
document.querySelector('.changeSignal').addEventListener('click', () => changeSignal());
document.querySelector('.dot').addEventListener('click', () => dotHandler());

    

document.querySelectorAll('.numbers').forEach(btn => btn.addEventListener('click', event => {
    numberToDisplay(event.target.innerHTML)
}));

document.querySelectorAll('.operations').forEach(btn => btn.addEventListener('click', event => {
    operations(event.target.innerHTML)
}));


function clearDisplay() {
    result.innerHTML = 0;
    calculation.innerHTML = 0;
    clearResult = false;
    firstOperator = null;
    firstNum = 0;
    secondNum = 0;
    total = 0;
    dot = false;
};

function clearEntryDisplay() {
    result.innerHTML = 0
};

function eraseNum() {
    let erased = result.innerHTML.replace(/.$/,'');
    erased === ''? result.innerHTML = 0: result.innerHTML = erased
};

function dotHandler() {
    if (!result.innerHTML.includes('.')) result.innerHTML = `${result.innerHTML}.`;       
}

function changeSignal() {
    if (result.innerHTML.startsWith('-')) {
        result.innerHTML = result.innerHTML.slice(1)
    } else {
        result.innerHTML = `-${result.innerHTML}`
    }
}

function numberToDisplay(number) {
    if (calculation.innerHTML.includes('=')) clearDisplay()

    if (result.innerHTML === '0' || clearResult === true) {
        clearResult = false;
        result.innerHTML = number
        
    } else {
        result.innerHTML = `${result.innerHTML}${number}`
    }
}

function equalHandler() {
    if (calculation.innerHTML.includes('=')) {
        firstNum = total;    
    } else {
       secondNum = Number(result.innerHTML) 
    }

    calculation.innerHTML = `${firstNum} ${firstOperator} ${secondNum} =`
    total = doMath(firstOperator);

    result.innerHTML = total;
    clearResult = true;
}

function operations(operator) {

    if (calculation.innerHTML == 0) {
        calculation.innerHTML = `${result.innerHTML} ${operator}`
        firstOperator = operator;
        firstNum = Number(result.innerHTML);

    } else {
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
            return divide(a, b)
        case 'x':
            return multiply(a, b)
        default:
            return 0  
    }
}

function KeyEvent(key) {

    if (Number.isInteger(Number(key))) numberToDisplay(key);

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