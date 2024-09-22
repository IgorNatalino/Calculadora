const toggleSwitch = document.getElementById('toggleSwitch');
const toggleKnob = toggleSwitch.querySelector('.toggle-knob');
const temaAtual = document.querySelector('[data-theme]');

let currentState = 0;

toggleSwitch.addEventListener('click', () => {
	currentState = (currentState + 1) % 3; // Muda para o próximo estado (0, 1, 2)

	// Muda a posição da "knob" e o tema com base no estado atual
	switch (currentState) {
		case 0:
			toggleKnob.style.left = '10%';
			temaAtual.setAttribute('data-theme', '1');
			break;
		case 1:
			toggleKnob.style.left = '38%';
			temaAtual.setAttribute('data-theme', '2');
			break;
		case 2:
			toggleKnob.style.left = '68%';
			temaAtual.setAttribute('data-theme', '3');
			break;
	}
});
