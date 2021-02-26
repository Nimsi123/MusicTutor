const promptTagId = "prompt";
const answerTagId = "answer";
const inputTagId = "input";

const submitButtonId = "submit";
const nextButtonId = "next";

function submitOnClick() {

	var question = document.getElementById(submitButtonId).question;
	question.validateAnswer(inputTagId, answerTagId);

	document.getElementById(submitButtonId).style.visibility = "hidden";
	document.getElementById(nextButtonId).style.visibility   = "visible";
	document.getElementById(answerTagId).style.visibility    = "visible";
}

function nextOnClick(qType) {

	var question = genQ(qType);
	question.postPrompt(promptTagId);
	question.postInput(inputTagId);

	document.getElementById(submitButtonId).style.visibility = "visible";
	document.getElementById(nextButtonId).style.visibility   = "hidden";
	document.getElementById(answerTagId).style.visibility    = "hidden";

	document.getElementById(submitButtonId).question = question;
}

function setNextOnClick(qType) {
	document.getElementById(nextButtonId).onclick = function () {
		nextOnClick(qType);
	};
}