const result = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');
const currentValue = document.querySelector('#current_result'); // Constante para armazenar o último resultado

let currentNumber = '';
let firstOperand = null;
let operator = null;
let restart = false;
const max_digits = 16; // Definindo o limite máximo de 16 dígitos

function updateResult(originClear = false) {
	result.innerText = originClear || !currentNumber ? '0' : currentNumber.replace('.', ',');
}

function addDigit(digit) {
	// Se o número já tiver 16 caracteres, não permite adicionar mais
	if (currentNumber.replace(/\s/g, '').length >= max_digits) return;

	// Se o último caractere já for parte de um número decimal (com vírgula), não permite outra vírgula
	const lastNumber = currentNumber.split(' ').pop();
	if (digit === '.' && lastNumber.includes('.')) return;

	if (restart) {
		currentNumber = digit;
		restart = false;
	} else {
		currentNumber += digit;
	}

	updateResult();
}

function setOperator(newOperator) {
	if (currentNumber) {
		if (firstOperand === null) {
			firstOperand = parseFloat(currentNumber.replace(',', '.'));
		} else if (!restart) {
			calculate(); // Realiza o cálculo intermediário para permitir operações contínuas
		}

		currentNumber = `${currentNumber} ${newOperator} `;
	}

	operator = newOperator;
	restart = false;
	updateResult();
}

function calculate() {
	if (operator === null || firstOperand === null) return;

	let secondOperand = parseFloat(currentNumber.split(' ').pop().replace(',', '.'));
	let resultValue;

	switch (operator) {
		case '+':
			resultValue = firstOperand + secondOperand;
			break;
		case '-':
			resultValue = firstOperand - secondOperand;
			break;
		case 'x':
			resultValue = firstOperand * secondOperand;
			break;
		case '/':
			resultValue = firstOperand / secondOperand;
			break;
		default:
			return;
	}

	currentNumber = resultValue.toString(); // Mantém o resultado no display

	operator = null;
	firstOperand = resultValue; // Usa o resultado como o novo primeiro operando
	restart = true; // Permite digitar o próximo número sem sobrescrever o resultado

	// Atualiza o valor do último cálculo em currentValue
	currentValue.innerText = `${currentNumber.replace('.', ',')}`;
	updateResult();
}

function clearCalculator() {
	currentNumber = '';
	firstOperand = null;
	operator = null;
	updateResult(true); // Chama updateResult com originClear para exibir "0"
}

function deleteLastDigit() {
	currentNumber = currentNumber.slice(0, -1);
	updateResult();
}

function resetCalculator() {
	clearCalculator();
}

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		const buttonText = button.innerText;

		if (/^[0-9.]+$/.test(buttonText)) {
			addDigit(buttonText);
		} else if (['+', '-', 'x', '/'].includes(buttonText)) {
			setOperator(buttonText);
		} else if (buttonText === '=') {
			calculate();
		} else if (buttonText === 'RESET') {
			resetCalculator();
		} else if (buttonText === 'DEL') {
			deleteLastDigit();
		}
	});
});
