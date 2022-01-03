class Interval extends Question {

	static inputTagId = "input";

	constructor() {
		var qFeatures = gen_intervalQ();
		var prompt = "What is the inverval between " + qFeatures.start + " and " + qFeatures.end + ", ascending?";
		var answer = qFeatures.interval;
		super(prompt, answer);
	}

	/** Adds the input site to the HTML element with id = inputID. 
	@override
	*/
	postInput(inputId) {
		var elem = document.getElementById(inputId);
		this.clearInput(elem);

		elem.appendChild(
			_makeDropDown(intervals, "Interval", Interval.inputTagId)
		);
	}

	/** Assumes that an input site already exists. Clears the input box. 
	@override
	*/
	clearInput(elem) {
		elem.innerHTML = "";
	}

	/** Returns the user's input in a friendly format. */
	_getInput(inputId) {
		return document.getElementById(inputId).innerHTML;
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	@override
	*/
	validateAnswer(answerId) {
		var userInput = this._getInput(Interval.inputTagId);

		var message;
		if (userInput === this.answer) {
			message = "CORRECT!";
		} else {
			message = "Incorrect! The answer is --> " + this.answer;
		}
		document.getElementById(answerId).innerHTML = message;
	}
}