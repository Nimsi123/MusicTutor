function _interval_genVals() {
	/** Returns two different values in the range [0, 12). */
	var a = Math.floor(Math.random() * 12);
	var b = Math.floor(Math.random() * 12);

	while (a === b) {
		a = Math.floor(Math.random() * 12);
		b = Math.floor(Math.random() * 12);
	}

	return [a, b];
}

function _cmp_intervalDistance(a, b) {
	/** Computes the number of half steps between two indices on the keyboard. */
	if (b > a) {
		return b-a;
	} else {
		return 12 - (a - b);
	}
}

function _cmp_third_fifth_disp(type) {
	/** Returns values for the third and fifth note displacements from the root. */
	switch (type) {
		case "major":
			return [4, 7];
		case "minor":
			return [3, 7];
		case "augmented":
			return [4, 8];
		case "diminished":
			return [3, 6];
	}
}

function _applyAccidentals(note, accidental, to_change) {
	/** Returns a list of white keys starting at note where accidental is appended to letters in to_change. */
	
	var scale = [];
	for (var i = 0, c = whites.indexOf(note); i <= whites.length; i++) {
		var letter = whites[(c + i) % whites.length];

		if (to_change.includes(letter)) {
			scale.push(letter + accidental);
		} else {
			scale.push(letter);
		}
	}

	return scale;
}

function gen_intervalQ() {
	var a, b;
	[a, b] = _interval_genVals();
	
	var distance = _cmp_intervalDistance(a, b);
	var interval_name = choose_randFromValues(intervals, distance - 1);

	var start = choose_randFromValues(keyboard, a);
	var end = choose_randFromValues(keyboard, b);

	return {
		start: start,
		end: end,
		interval: interval_name,
		distance: distance
	};
}

function gen_chordQ() {
	var a = Math.floor(Math.random() * 12); // random key on the keyboard (whites and blacks)
	var root = choose_randFromValues(keyboard, a);

	var type = randomChoice(chords);

	var third_disp, fifth_disp;
	[third_disp, fifth_disp] = _cmp_third_fifth_disp(type);

	third = (a + third_disp) % 12;
	fifth = (a + fifth_disp) % 12;

	var indices = [a, third, fifth];

	var chord_letters = [];
	for (var i of indices) {
		chord_letters.push(
			choose_randFromValues(keyboard, i)
		);
	}

	return {
		"scale_type": type,
		"root": root,
		"chord_name": root + " " + type,
		"chord_indices": indices,
		"chord_non_exact_answer": chord_letters
	};
}

function gen_scaleQ() {
	var accidental = randomChoice(accidentals);
	var a = Math.floor(Math.random() * 8);

	var note, to_change;
	if (accidental === "#") {
		note = circ[a.toString()];
		to_change = beads.slice(beads.length - a, beads.length);
	} else {
		note = circ[(-a).toString()];
		to_change = beads.slice(0, a);
	}
	
	var scale = _applyAccidentals(note.charAt(0), accidental, to_change);

	return {
		"scale_name": note + " major",
		"scale": scale
	};
}