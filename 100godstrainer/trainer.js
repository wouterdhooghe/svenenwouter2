(function(){
	// State
	let mode = 'number'; // 'number' | 'letters'
	let currentNumber = 0;
	let currentLetters = 'aa';
	// For letter zones input tracking
	let liveZonesActive = false;

	// Elements
	const numberDisplay = document.getElementById('numberDisplay');
	const lettersDisplay = document.getElementById('lettersDisplay');
	const numberZonesEl = document.getElementById('numberZones');
	const letterZonesEl = document.getElementById('letterZones');
	const modeNumberBtn = document.getElementById('modeNumber');
	const modeLettersBtn = document.getElementById('modeLetters');

	// Build zones
	// Number zones: 0..9
	const numberZones = [];
	for (let d = 0; d <= 9; d++) {
		const btn = document.createElement('button');
		btn.className = 'zone';
		btn.textContent = String(d);
		btn.dataset.value = String(d);
		btn.addEventListener('touchstart', handleNumberZoneTouch, {passive: true});
		btn.addEventListener('mousedown', handleNumberZoneClick);
		numberZonesEl.appendChild(btn);
		numberZones.push(btn);
	}

	// Letter zones: a..z for two positions
	const letters = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
	const letterZones = [];
	for (let pos = 0; pos < 2; pos++) {
		const row = document.createElement('div');
		row.className = 'zones-row';
		row.dataset.pos = String(pos);
		for (const ch of letters) {
			const btn = document.createElement('button');
			btn.className = 'zone';
			btn.textContent = ch;
			btn.dataset.char = ch;
			btn.dataset.pos = String(pos);
			btn.addEventListener('touchstart', handleLetterZoneTouch, {passive: true});
			btn.addEventListener('mousedown', handleLetterZoneClick);
			row.appendChild(btn);
			letterZones.push(btn);
		}
		letterZonesEl.appendChild(row);
	}

	// Mode switching
	function setMode(newMode) {
		mode = newMode;
		if (mode === 'number') {
			numberZonesEl.style.display = 'flex';
			letterZonesEl.style.display = 'none';
			updateNumberUI();
		} else {
			numberZonesEl.style.display = 'none';
			letterZonesEl.style.display = 'block';
			updateLettersUI();
		}
	}
	modeNumberBtn.addEventListener('click', () => setMode('number'));
	modeLettersBtn.addEventListener('click', () => setMode('letters'));

	// Swipe handling using ZingTouch
	const region = new ZingTouch.Region(document.body);
	function bindSwipe(el, onLeft, onRight){
		region.bind(el, 'swipe', function(e){
			const dir = e.detail.data[0].currentDirection;
			const right = (dir < 45 || dir > 315);
			const left = (dir > 135 && dir < 225);
			if (right) { onRight(); }
			if (left) { onLeft(); }
		});
	}

	function incNumber(){ setNumber(currentNumber + 1); }
	function decNumber(){ setNumber(Math.max(0, currentNumber - 1)); }

	function nextLetters(){ setLetters(incrementTwoLetters(currentLetters)); }
	function prevLetters(){ setLetters(decrementTwoLetters(currentLetters)); }

	bindSwipe(numberDisplay, decNumber, incNumber);
	bindSwipe(lettersDisplay, prevLetters, nextLetters);

	// Number UI: highlight zones matching digits of currentNumber
	function setNumber(n){
		currentNumber = n;
		numberDisplay.textContent = String(currentNumber);
		if (!liveZonesActive) {
			highlightNumberZonesFor(currentNumber);
		}
	}

	function highlightNumberZonesFor(n){
		const digits = String(n).split('');
		// Simple strategy: light up all digits present at least once
		const active = new Set(digits);
		for (const btn of numberZones) {
			if (active.has(btn.dataset.value)) btn.classList.add('zone--active');
			else btn.classList.remove('zone--active');
		}
	}

	function handleNumberZoneTouch(ev){
		// On touch: reset to 0, deactivate highlights, then follow live inputs
		liveZonesActive = true;
		numberZones.forEach(b => b.classList.remove('zone--active'));
		setNumber(0);
		applyNumberInput(ev.currentTarget.dataset.value);
	}
	function handleNumberZoneClick(ev){
		liveZonesActive = true;
		numberZones.forEach(b => b.classList.remove('zone--active'));
		setNumber(0);
		applyNumberInput(ev.currentTarget.dataset.value);
	}
	function applyNumberInput(d){
		setNumber(currentNumber * 10 + parseInt(d,10));
	}

	// Letters
	function setLetters(s){
		currentLetters = s;
		lettersDisplay.textContent = s;
		if (!liveZonesActive) highlightLetterZonesFor(s);
	}
	function highlightLetterZonesFor(s){
		const a = s[0], b = s[1];
		for (const btn of letterZones) {
			const pos = parseInt(btn.dataset.pos,10);
			const ch = btn.dataset.char;
			const active = (pos === 0 ? a : b) === ch;
			btn.classList.toggle('zone--active', active);
		}
	}
	function handleLetterZoneTouch(ev){
		liveZonesActive = true;
		letterZones.forEach(b => b.classList.remove('zone--active'));
		updateLettersFromZone(ev.currentTarget);
	}
	function handleLetterZoneClick(ev){
		liveZonesActive = true;
		letterZones.forEach(b => b.classList.remove('zone--active'));
		updateLettersFromZone(ev.currentTarget);
	}
	function updateLettersFromZone(btn){
		const pos = parseInt(btn.dataset.pos,10);
		const ch = btn.dataset.char;
		const arr = currentLetters.split('');
		arr[pos] = ch;
		setLetters(arr.join(''));
	}

	// Helpers: two-letter lexicographic increment/decrement over aa..zz
	function incrementTwoLetters(s){
		let a = s.charCodeAt(0) - 97;
		let b = s.charCodeAt(1) - 97;
		b += 1;
		if (b >= 26) { b = 0; a += 1; }
		if (a >= 26) { a = 0; }
		return String.fromCharCode(97 + a) + String.fromCharCode(97 + b);
	}
	function decrementTwoLetters(s){
		let a = s.charCodeAt(0) - 97;
		let b = s.charCodeAt(1) - 97;
		b -= 1;
		if (b < 0) { b = 25; a -= 1; }
		if (a < 0) { a = 25; }
		return String.fromCharCode(97 + a) + String.fromCharCode(97 + b);
	}

	// Reset live mode on touchend outside zones to resume highlighting following state
	document.addEventListener('touchend', () => { liveZonesActive = false; resyncHighlights(); }, {passive: true});
	document.addEventListener('mouseup', () => { liveZonesActive = false; resyncHighlights(); });

	function resyncHighlights(){
		if (mode === 'number') highlightNumberZonesFor(currentNumber);
		else highlightLetterZonesFor(currentLetters);
	}

	// Initialize
	setNumber(0);
	setLetters('aa');
	setMode('number');
})();