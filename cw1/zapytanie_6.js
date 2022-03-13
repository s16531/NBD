printjson(db.people.insert({
	"sex" : "Male",
	"first_name" : "Patryk",
	"last_name" : "Dąbrowski",
	"job" : "Head of Software Development",
	"email" : "s16531@pjwstk.edu.pl",
	"location" : {
		"city" : "Warsaw",
		"address" : {
			"streetname" : "Koszykowa",
			"streetnumber" : "86"
		}
	},
	"description" : "An ambitous student",
	"height" : "192.38",
	"weight" : "99.81",
	"birth_date" : "1995-01-27T02:55:03Z",
	"nationality" : "Poland",
	"credit" : [
		{
			"type" : "visa",
			"number" : "6759888939100098610",
			"currency" : "PLN",
			"balance" : "4242.06"
		}
	]
}))