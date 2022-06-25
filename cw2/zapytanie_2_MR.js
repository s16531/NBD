var mapFunction = function() {
    this.credit.forEach(e => {
        emit(e.currency, Number(e.balance))
    })
};

var reduceFunction = function(currency, balance) {
    return Array.sum(balance)
}

db.people.mapReduce(
    mapFunction,
    reduceFunction, {
        out: "map_reduce_zapytanie_2"
    }
)

printjson(db.map_reduce_zapytanie_2.find({}).toArray())