printjson(db.people.aggregate({
        "$project": {
            "nationality": 1,
            "bmi": {
                "$divide": [
                    { "$toDouble": "$weight" },
                    {
                        "$multiply": [
                            { "$toDouble": "$height" },
                            { "$toDouble": "$height" }
                        ]
                    }
                ]
            }
        }
    }, {
        "$group": {
            _id: "$nationality",
            "maxBmi": {
                "$max": {
                    "$toDouble": "$bmi"
                }
            },
            "min": {
                "$min": {
                    "$toDouble": "$bmi"
                }
            },
            "avgBmi": {
                "$avg": {
                    "$toDouble": "$bmi"
                }
            }
        }
    }, { "$sort": { "_id": 1 } })
    .toArray())