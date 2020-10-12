const calculator = { //задаем значения дефолта
  displayValue: '0', 
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

// вводим целое число, так же проверяем есть ли следующее
function inputDigit(digit) {
  const displayValue = calculator.displayValue,
        waitingForSecondOperand = calculator.waitingForSecondOperand;


  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // если введен ноль, то перезаписываем, если нет - добавляем новую цифру
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

// функция для ввода дробных чисел
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = "0."
    calculator.waitingForSecondOperand = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

// функция для операторов
function handleOperator(nextOperator) {
  const firstOperand = calculator.firstOperand,
        displayValue = calculator.displayValue,
        operator = calculator.operator,
        inputValue = parseFloat(displayValue);
  
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }


  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.firstOperand = result;
  }
  
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// обновляем поле ввода-вывода
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
  const target = event.target,
        value = target.value;
  if (!target.matches('button')) return;

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});