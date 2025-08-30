const display = document.querySelector('.final-number p');
const buttons = document.querySelectorAll('input[type="button"]');

let expression = '';

const ops = ['+', '-', '*', '/', '%', '.'];

function updateDisplay(value) {
    display.textContent = value || '0';
}

function handleInput(input) {
    if (input === 'C') {
        expression = '';
    } else if (input === '<-') {
        expression = expression.slice(0, -1);
    } else if (input === '=') {
        try {
            const result = Function('"use strict"; return (' + expression + ')')();
            expression = result.toString();
        } catch (err) {
            expression = '';
            updateDisplay('خطا');
            return;
        }
    } else {
        // جلوگیری از دوبار زدن اپراتور
        const lastChar = expression.at(-1);
        if (ops.includes(input) && ops.includes(lastChar)) return;
        expression += input;
    }

    updateDisplay(expression);
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.value));
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9+\-*/%.]/.test(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        e.preventDefault();
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('<-');
    } else if (key.toLowerCase() === 'c') {
        handleInput('C');
    }
});