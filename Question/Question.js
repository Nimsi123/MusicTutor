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

	postPrompt(promptId) {
		/** Adds the prompt text to the HTML element with id = promptID. */
		document.getElementById(promptId).innerHTML = this.prompt;
	}

	/** Adds the input site to the HTML element with id = inputID. 
	*/
	postInput(inputId) {
	}

	/** Assumes that an input site already exists. Clears the input box. 
	*/
	clearInput(inputId) {
	}

	/** Validates the user's input. Outputs the answer to answerID. 
	*/
	validateAnswer(answerId) {
	}

}