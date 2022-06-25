printJson(db.people.aggregate({
    "$group": {
        _id: "$sex",
        averageWeight: { $avg: { $toDouble: "$weight" } },
        averageHeight: {
            $avg: { $toDouble: "$height" }
        }
    }
}).toArray())