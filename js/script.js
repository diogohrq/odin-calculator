const buttons = document.querySelectorAll('.calculator__btn');
const displayOperation = document.querySelector('.display__operation');
const displayResult = document.querySelector('.display__result');

buttons.forEach(button => button.addEventListener('click', (e) => {
  buttonClick(e.target);
}));

const buttonClick = (button) => {
  const buttonType = button.classList[1]; 
  const buttonValue = button.dataset.value;
  
  switch (buttonType) {
    case 'btn__digit':
      digitAction(buttonValue);
      break;
    case 'btn__operator':
      operatorAction(buttonValue);
      break;
    case 'btn__decimal':
      decimalAction();
      break;
    case 'btn__clear':
      clearAction();
      break;
    case 'btn__delete':
      deleteAction();
      break;
    default:
      return null;
  }
}

const digitAction = (value) => {
  if (operator == null) {
    number1 += value;
  } else {
    number2 += value;
  }

  updateDisplay();
}

const operatorAction = (value) => {
  if (value != '=') {
    if (number2 != ''){
      operate();
      newOperation();
    }

    operator = value;
  } else {
    operate();
  }

  updateDisplay();
}

const decimalAction = () => {
  if (operator == null) {
    number1 += '.';
  } else {
    number2 += '.';
  }

  updateDisplay();
}

const deleteAction = () => {
  if (operator == null) {
    number1 = number1.slice(0, number1.length - 1);
  } else {
    if (number2.length == 0) {
      operator = null;
    } else {
      number2 = number2.slice(0, number2.length - 1)
    }
  }

  updateDisplay();
}

const clearAction = () => {
  number1 = '';
  number2 = '';
  operator = null;
  result = null;

  updateDisplay();
}

const newOperation = () => {
  number1 = result;
  number2 = '';
  result = null;
}

const updateDisplay = () => {
  displayOperation.textContent = `${number1} ${operator ?? ''} ${number2}`;
  displayResult.textContent = `${result ?? ''}`;
}

let number1 = '';
let number2 = '';
let operator = null;
let result = null;

const operate = () => {
  number1 = Number(number1);
  number2 = Number(number2);

  switch (operator) {
    case '+':
      result = add(number1, number2);
      break;
    case '-':
      result = subtract(number1, number2);
      break;
    case '*':
      result = multiply(number1, number2);
      break;
    case '/':
      result = divide(number1, number2);
      break;
    default:
      return null;
  }
}

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;