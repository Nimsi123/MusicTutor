// Interactive component utils

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