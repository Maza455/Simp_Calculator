let display = document.getElementById('display');
let historyList = document.getElementById('history');
let memory = [];

function pressNum(num) {
	display.value += num;
}

function pressOp(op) {
	if (display.value !== '') {
		memory.push(display.value);
		memory.push(op);
		display.value = '';
	}
}

function pressClear() {
	display.value = '';
	memory = [];
}

function pressEquals() {
	if (display.value !== '') {
		memory.push(display.value);
	}
	let expression = '';
	for (let i = 0; i < memory.length; i++) {
		expression += memory[i];
	}
	let result = eval(expression);
	display.value = result;
	memory.push('=' + result);
	saveToLocalStorage(memory);
	displayHistory();
}

function saveToLocalStorage(memory) {
	localStorage.setItem('calculatorHistory', JSON.stringify(memory));
}

function getFromLocalStorage() {
	let storedMemory = localStorage.getItem('calculatorHistory');
	if (storedMemory) {
		memory = JSON.parse(storedMemory);
		displayHistory();
	}
}

function displayHistory() {
	historyList.innerHTML = '';
	for (let i = 0; i < memory.length; i++) {
		let item = document.createElement('li');
		item.innerText = memory[i];
		historyList.appendChild(item);
	}
}

getFromLocalStorage();
