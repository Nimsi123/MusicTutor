class Chord extends Question {

	constructor() {
		super();
		var qFeatures = gen_chordQ();
		this.prompt = "What is the " + qFeatures.chord_name + " chord?";
		this.answer = qFeatures.chord_non_exact_answer;
		this.exact_answer = qFeatures.chord_indices;
	}

	/** Adds the input site to the HTML element with id = inputID. 
	@override
	*/
	postInput(inputId) {
		var elem = document.getElementById(inputId);
		this.clearInput(elem);

		elem.appendChild(
			_makeRowOfDropDown(letters, " ", 3)
		);
	}

	/** Assumes that an input site already exists. Clears the input box. 
	@override
	*/
	clearInput(elem) {
		elem.innerHTML = "";
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	@override
	*/
	validateAnswer(answerId) {
		var userInput = _getInputFromRowOfDropDown(3);
		var indices = [];
		for (var letter of userInput) {
			indices.push(
				parseInt(find_key(keyboard, letter))
			);
		}

		var message;
		if (JSON.stringify(indices) === JSON.stringify(this.exact_answer)) {
			message = "CORRECT!";
		} else {
			message = "Incorrect! The answer is --> " + this.answer;
		}
		document.getElementById(answerId).innerHTML = message;
	}
}