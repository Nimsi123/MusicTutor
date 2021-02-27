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
			question = new Chord();
			break;
	}
	return question;
}

function _getInputFromRowOfDropDown(counts) {
	/** Assumes the user is inputting data into an input structure returned from `_makeRowOfDropDown` 
	Returns a list.*/

	var inputs = [];
	for (var i = 0; i < counts; i++) {
		inputs.push(
			document.getElementById("inp" + i).innerHTML
		);
	}

	return inputs;
}

function _makeRowOfDropDown(elements, startingEntry, number){
	/** Returns a DOM object. It is many columns within a row. Within each column is a dropdown menu. */

	var scaleInput = jQuery.parseHTML(`<div class = "row" id = "input-space"></div>`)[0];

	for (var i = 0; i < number; i++) {
		var block = jQuery.parseHTML(`<div class = "col"></div>`)[0];
		block.appendChild(
			_makeDropDown(letters, startingEntry, "inp" + i)
		);

		scaleInput.appendChild(block);
	}

	return scaleInput;
}

function _makeDropDown(elements, startingEntry, replaceId) {
	/** Creates a dropdown menu with `elements` entries and the starting string `startingEntry` */
	
	var command = "document.getElementById('" + replaceId + "').innerHTML = this.innerHTML";
	var buttons = "";
	for (var i of elements) {
		buttons += `<button class="dropdown-item" onclick = "` + command + `">` + i + `</button>`;
	}

	var form = jQuery.parseHTML(`
	<div class="dropdown">
	  <button id = "` + replaceId + `" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    ` + startingEntry + `
	  </button>
	  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
	    ` + buttons + `
	  </div>
	</div>`
	)[1];

	return form;
}