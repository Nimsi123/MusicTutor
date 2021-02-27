const promptTagId = "prompt";
const answerTagId = "answer";
const inputSpaceTagId = "input-space";

const submitButtonId = "submit";
const nextButtonId = "next";

function submitOnClick() {
	/** Logic for the onclick attribute of the submit button. */

	var question = document.getElementById(submitButtonId).question;
	question.validateAnswer(answerTagId);

	document.getElementById(submitButtonId).style.visibility  = "hidden";
	document.getElementById(inputSpaceTagId).style.visibility = "hidden";
	document.getElementById(nextButtonId).style.visibility    = "visible";
	document.getElementById(answerTagId).style.visibility     = "visible";
}

function nextOnClick(qType) {
	/** Logic for the onclick attribute of the next button. */

	var question = genQ(qType);
	question.postPrompt(promptTagId);
	question.postInput(inputSpaceTagId);

	document.getElementById(submitButtonId).style.visibility  = "visible";
	document.getElementById(inputSpaceTagId).style.visibility = "visible";
	document.getElementById(nextButtonId).style.visibility    = "hidden";
	document.getElementById(answerTagId).style.visibility     = "hidden";

	document.getElementById(submitButtonId).question = question;
}

function setNextOnClick(qType) {
	/** Assigns the onclick attribute for the next button. This function is called whenever the user changes
		the type of question to practice. Also, this function sets the first question on the page.
	*/
	document.getElementById(nextButtonId).onclick = function () {
		nextOnClick(qType);
	};
	nextOnClick(qType); //actually call onclick
}