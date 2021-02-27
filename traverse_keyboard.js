var keyboard = {
	0: ["C", "B#"], 
	1: ["C#", "Db"], 
	2: ["D"], 
	3: ["D#", "Eb"], 
	4: ["E", "Fb"],        
    5: ["F", "E#"], 
    6: ["F#", "Gb"], 
    7: ["G"], 
    8: ["G#", "Ab"], 
    9: ["A"],
    10: ["A#", "Bb"], 
    11: ["B", "Cb"]
};

var beads = ["B", "E", "A", "D", "G", "C", "F"];
var whites = ["A", "B", "C", "D", "E", "F", "G"];
var keyboard_whites_ordering = ["C", "D", "E", "F", "G", "A", "B"];
var circ = {
	 '0': "C", 
	 '1': "G",  '2': "D",   '3': "A",   '4': "E",   '5': "B",   '6': "F#",  '7': "C#", 
	'-1': "F", '-2': "Bb", '-3': "Eb", '-4': "Ab", '-5': "Db", '-6': "Gb", '-7': "Cb"
};

var intervals = ["m2", "M2", "m3", "M3", "P4", ["aug4, d5, TT"], "P5", "m6", "M6", "m7", "M7"];
var letters = ['Ab', 'A', 'A#', 'Bb', 'B', 'B#', "Cb", 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#'];
var chords = ["major", "minor", "augmented", "diminished"];
var accidentals = ["#", "b"];

function randomChoice(list){
	/** Returns a random element from list. */
	return list[Math.floor(Math.random() * list.length)];
}

function choose_randFromValues(collection, key) {
	/** Returns a single value from collection[key]. Collection can be a list or an object. */
	var vals = collection[key];
	if (typeof vals === "object") {
		return randomChoice(vals);
	}
	return vals;
}

function find_key(collection, value) {
	for (var key in collection) {
		if (collection[key].includes(value)) {
			return key;
		}
	}
	return -69;
	//throw new Error("Value: " + value + " not found in dictionary " + collection);
}

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

function _cmp_third_fifth_disp(type) {
	/** Returns values for the third and fifth note displacements from the root. */

	var third, fifth;

	if (type === "major") {
		third = 4;
		fifth = 7;
	} else if (type === "minor") {
		third = 3;
		fifth = 7;
	} else if (type === "augmented") {
		third = 4;
		fifth = 8;
	} else if (type === "diminished") {
		third = 3;
		fifth = 6;
	}

	return [third, fifth];
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

function _applyAccidentals(note, accidental, to_change) {
	/** Returns a list of keys starting at note where accidental is appended to letters in to_change. */
	
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

//console.log(gen_intervalQ());
//console.log(gen_chordQ());
console.log(gen_scaleQ());