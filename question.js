class Question {
	/**
	Life-cycle of a Question object.
	- Instantiated when we create a new question (when the `next` button is pressed).
	- Deleted once the `next` button is pressed.
	*/

	constructor(prompt, answer) {
		console.log("super");
		this.prompt = prompt;
		this.answer = answer;
	}

	postPrompt(promptId) {
		/** Adds the prompt text to the HTML element with id = promptID. */
		console.log("postPrompt");
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

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	*/
	validateAnswer(inputId, answerId) {
	}

}

class Interval extends Question {

	constructor() {
		var qFeatures = gen_intervalQ();
		var prompt = "What is the inverval between " + qFeatures.start + " and " + qFeatures.end + "?";
		var answer = qFeatures.interval;
		super(prompt, answer);
	}

	/** Adds the input site to the HTML element with id = inputID. 
	@override
	*/
	postInput(inputId) {
		console.log("postInput");
		var elem = document.getElementById(inputId);
		elem.innerHTML = "";

		var form = jQuery.parseHTML(`
			<form>
			  <div class="form-group">
			    <input class="form-control" id="input" placeholder="interval">
			  </div>
			</form>
		`)[1];

		elem.appendChild(form);
	}

	/** Assumes that an input site already exists. Clears the input box. 
	@override
	*/
	clearInput(inputId) {
		console.log("clearInput");
	}

	/** Returns the user's input in a friendly format. */
	_getInput(inputId) {
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	@override
	*/
	validateAnswer(inputId, answerId) {
		console.log("validateAnswer");
		var userInput = document.getElementById(inputId).value;

		var extraMessage;
		if (userInput === this.answer) {
			extraMessage = "CORRECT!";
		} else {
			extraMessage = "Incorrect!";
		}

		document.getElementById(answerId).innerHTML = extraMessage + "\n" + this.answer;
	}
}

function genQ(qType) {
	var question;
	switch (qType) {
		case "interval":
			console.log("interval");
			question = new Interval();
			break;
		case "scale":
			console.log("scale");
			break;
		case "chord":
			console.log("chord");
			break;
	}
	return question;
}