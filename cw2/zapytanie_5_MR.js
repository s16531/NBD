var mapFunction = function() {
    this.credit.forEach(e => {
        emit(e.currency, {
            balance: Number(e.balance),
            count: 1
        })
    })
}

var reduceFunction = function(currency, data) {
    var res = { count: 0, sum: 0 }
    data.forEach(e => {
        res.count += e.count,
            res.sum += e.balance
    })

    return res;
}

var finalizeFunction = function(currency, reducedData) {
    var res = {
        avg: reducedData.sum / reducedData.count,
        sum: reducedData.sum
    }
    return res;
}

db.people.mapReduce(
    mapFunction,
    reduceFunction, {
        out: "map_reduce_zapytanie_5",
        query: {
            "$and": [
                { sex: "Female" },
                { nationality: "Poland" }
            ]
        },
        finalize: finalizeFunction
    }
)

printjson(db.map_reduce_5.find().sort({ _id: 1 }).toArray())