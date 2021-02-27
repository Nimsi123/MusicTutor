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

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	*/
	validateAnswer(inputId, answerId) {
	}

}

class Interval extends Question {

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
		elem.innerHTML = "";

		/*
		var form = jQuery.parseHTML(`
			<form>
			  <div class="form-group">
			    <input class="form-control" id="input" placeholder="interval">
			  </div>
			</form>
		`)[1];
		*/

		var command = "document.getElementById('" + inputTagId + "').innerHTML = this.innerHTML";
		var buttons = "";
		for (var i of intervals) {
			buttons += `<button class="dropdown-item" onclick = "` + command + `">` + i + `</button>`;
		}

		var form = jQuery.parseHTML(`<div class="dropdown">
		  <button id = "input" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    Interval
		  </button>
		  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		    ` + buttons + `
		  </div>
		</div>`)[0];

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
		return document.getElementById(inputId).innerHTML;
	}

	/** Validates the user's input at inputID. Outputs the answer to answerID. 
	@override
	*/
	validateAnswer(inputId, answerId) {
		var userInput = this._getInput(inputId);

		var extraMessage;
		if (userInput === this.answer) {
			extraMessage = "CORRECT!";
		} else {
			extraMessage = "Incorrect!";
		}

		document.getElementById(answerId).innerHTML = extraMessage + "\n" + this.answer;
	}
}

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
		elem.innerHTML = "";

		var form = jQuery.parseHTML(`
			<form>
			  <div class="form-group">
			    <input class="form-control" id="input" placeholder="scale">
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
			question = new Interval();
			break;
		case "scale":
			question = new Scale();
			break;
		case "chord":
			console.log("chord");
			break;
	}
	return question;
}