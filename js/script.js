const buttons = document.querySelectorAll('.calculator__btn');
const displayOperation = document.querySelector('.display__operation');
const displayResult = document.querySelector('.display__result');

document.addEventListener('keydown', (e) => {
  keyboardClick(e.key);
})

const keyboardClick = (key) => {
  switch (key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      digitAction(key);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case '=': 
      operatorAction(key);
      break;
    case '.':
      decimalAction();
      break;
    case 'c':
    case 'C':
      clearAction();
      break;
    case 'Backspace':
      deleteAction();
      break;
    default:
      return null;
  }
}

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
    if (result == null) {
      number2 += value;
    } else {
      clearAction();
      number1 +=  value;
    }
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
    if (number1 != '' && number2 != '') {
      operate();
    }
  }

  updateDisplay();
}

const decimalAction = () => {
  if (operator == null && !number1.includes('.')) {
    number1 += '.';
  } else if (operator != null && !number2.includes('.')) {
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

const add = (num1, num2) => {
  const result = num1 + num2;

  if (isFloat(result)) {
    return result.toFixed(6);
  } else {
    return result;
  }
}

const subtract = (num1, num2) => {
  const result = num1 - num2;

  if (isFloat(result)) {
    return result.toFixed(6);
  } else {
    return result;
  }
}

const multiply = (num1, num2) => {
  const result = num1 * num2;

  if (isFloat(result)) {
    return result.toFixed(6);
  } else {
    return result;
  }
}

const divide = (num1, num2) => {
  if (num2 == 0) {
    return null;
  }

  const result = num1 / num2;

  if (isFloat) {
    return result.toFixed(4);
  } else {
    return result;
  }
}

const isFloat = (number) => !Number.isInteger(number);