function generate_one_question(qType) {
	/** Multiplexes qType to a question instance */
	switch (qType) {
		case "interval":
			return new Interval();
		case "scale":
			return new Scale();
		case "chord":
			return new Chord();
	}
}

const worksheet_gen_questions = (req) => {
    req = [
        {
            qtype: "interval",
            count: 5
        },
        {
            qtype: "scale",
            count: 5
        },
        {
            qtype: "chord",
            count: 5
        },
    ];
    
    const res = [];
    req.map(question => {
        for (let i = 0; i < question.count; i++) {
            res.push(generate_one_question(question.qtype));
        }
    });

    return res;
};