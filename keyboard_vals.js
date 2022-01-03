// some constants used in generating questions

const keyboard = {
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
const circ = {
	 '0': "C", 
	 '1': "G",  '2': "D",   '3': "A",   '4': "E",   '5': "B",   '6': "F#",  '7': "C#", 
	'-1': "F", '-2': "Bb", '-3': "Eb", '-4': "Ab", '-5': "Db", '-6': "Gb", '-7': "Cb"
};
const whites = ["A", "B", "C", "D", "E", "F", "G"];
const keyboard_whites_ordering = ["C", "D", "E", "F", "G", "A", "B"];
const intervals = ["m2", "M2", "m3", "M3", "P4", ["aug4, d5, TT"], "P5", "m6", "M6", "m7", "M7"];
const chords = ["major", "minor", "augmented", "diminished"];
const beads = ["B", "E", "A", "D", "G", "C", "F"];
const letters = ['Ab', 'A', 'A#', 'Bb', 'B', 'B#', "Cb", 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#'];
const accidentals = ["#", "b"];