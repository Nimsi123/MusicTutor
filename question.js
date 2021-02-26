class Question {
	/**
	Life-cycle of a Question object.
	- Instantiated when we create a new question (when the `next` button is pressed).
	- Deleted once the `next` button is pressed.
	*/

	constructor(prompt, answer) {
		this.prompt = prompt;
		this.answer = answer;
	}

	postPrompt(promptID) {
		/** Adds the prompt text to the HTML element with id = promptID. */

		document.getElementById(promptID).innerHTML = prompt;
	}

	/** Adds the input site to the HTML element with id = inputID. 
	*/
	postInput(inputID) {
	}

	/** Assumes that an input site already exists. Clears the input box. 
	*/
	clearInput(inputID) {
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	*/
	check_and_postAnswer(inputID, answerID) {
	}

}

class Interval extends Question {

	constructor(prompt, answer) {
		super(prompt, answer);
	}

	/** Adds the input site to the HTML element with id = inputID. 
	@override
	*/
	postInput(inputID) {
	}

	/** Assumes that an input site already exists. Clears the input box. 
	@override
	*/
	clearInput(inputID) {
	}

	/** Returns the user's input in a friendly format. */
	_getInput(inputID) {
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	@override
	*/
	check_and_postAnswer(inputID, answerID) {
	}
}