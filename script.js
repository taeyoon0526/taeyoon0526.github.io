let firstValue = 0;
let displayReturn = false;
let operator;
window.onload = function() {
    // changeDisplayText();

    const buttons = document.querySelectorAll('button');
    let clickedValue;
    for (const button of buttons) {
        button.addEventListener('click', onclickButton)
    }
}

const onclickButton = (e) => {
    const clickedButton = e.target;
    const display = document.querySelector('.display-area');

    // clickedValue가 숫자일때
    if (clickedButton.classList.contains('num')) {
        changeDisplayText(clickedButton, display);
        displayReturn = false;
    }

    // clickedValue가 delete일때
    if (clickedButton.classList.contains('delete')) {
        display.innerText = display.innerText.length > 1 ? 
            display.innerText.slice(0, -1) : '0';
    }

    // clickedValue가 clear일때
    if (clickedButton.classList.contains('clear')) {
        display.innerText = '0';
        firstValue = 0;
        displayReturn = false;
        operator = null;
    }

    // clickedValue가 operator일때
    if (clickedButton.classList.contains('operator')) {
        if (firstValue && operator) {
            firstValue = calcuate(operator, firstValue, Number(display.innerText));
            display.innerText = firstValue;
        } else {
            firstValue = Number(display.innerText);
        }
        displayReturn = true;
        operator = clickedButton.innerText;
    }

    // clickedValue가 total 일때
    if (clickedButton.classList.contains('total')) {   
        if (operator) {
            display.innerText = calcuate(operator, firstValue, Number(display.innerText))
            firstValue = 0;
            displayReturn = true;
            operator = null;
        }
    }
}

const calcuate = (operator, first, second) => {
    switch (operator) {
        case '+':
            return first + second;
            break;
        case '-':
            return first - second;
            break;
        case '*':
            return first * second;
            break;
        case '/':
            return first / second;
            break;
    }
}

const changeDisplayText = (input, display) => {
    if (displayReturn || !displayReturn && display.innerText === '0') {
        // 기존 입력값이 없을때
        display.innerText = input.innerText;
    } else if (!displayReturn && display.innerText.length < 10) {
        // 기존 입력값이 있을때. 최대 10글자까지  
        display.innerText += input.innerText;
    }
}