printjson(db.people.aggregate({ "$unwind": "$credit" }, { "$match": { "nationality": "Poland" } }, { "$match": { "sex": "Female" } }, {
        "$group": {
            _id: "$credit.currency",
            "balanceSum": {
                "$sum": {
                    "$toDouble": "$credit.balance"
                }
            },
            "balanceAverage": {
                "$avg": {
                    "$toDouble": "$credit.balance"
                }
            }
        }
    }, { "$sort": { "_id": 1 } })
    .toArray())