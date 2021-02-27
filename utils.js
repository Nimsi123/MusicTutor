function randomChoice(list){
	/** Returns a random element from list. */
	return list[Math.floor(Math.random() * list.length)];
}

function choose_randFromValues(collection, key) {
	/** Returns a single value from collection[key]. Collection can be a list or an object. */
	var vals = collection[key];
	if (typeof vals === "object") {
		return randomChoice(vals);
	}
	return vals;
}

function find_key(collection, value) {
	/** Returns the key that associates to value within the collection mapping. */
	for (var key in collection) {
		if (collection[key].includes(value)) {
			return key;
		}
	}
	return -69;
	//throw new Error("Value: " + value + " not found in dictionary " + collection);
}