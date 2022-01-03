class Scale extends Question {

	constructor() {
		var qFeatures = gen_scaleQ();
		var prompt = "What is the scale of " + qFeatures.scale_name + "?";
		var answer = qFeatures.scale;
		super(prompt, answer);
	}

	/** Adds the input site to the HTML element with id = inputID. 
	@override
	*/
	postInput(inputId) {
		var elem = document.getElementById(inputId);
		this.clearInput(elem);

		elem.appendChild(
			_makeRowOfDropDown(letters, " ", 8)
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
		var userInput = _getInputFromRowOfDropDown(8);

		var message;
		if (JSON.stringify(userInput) === JSON.stringify(this.answer)) {
			message = "CORRECT!";
		} else {
			message = "Incorrect! The answer is --> " + this.answer;
		}
		document.getElementById(answerId).innerHTML = message;
	}
}