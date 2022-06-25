var mapFunction = function() {
    emit(this.sex, {
        count: 0,
        height: Number(this.height),
        weight: Number(this.weight)
    })
};

var reduceFunction = function(sex, data) {
    var reduced = { count: 0, height: 0, weight: 0 }
    data.forEach(e => {
        reduced.count++;
        reduced.height += e.height;
        reduced.weight += e.weight
    });
    return reduced;
};

var finalizeFunction = function(sex, reduced) {
    var result = {
        avgWeight: reduced.weight / reduced.count,
        avgHeight: reduced.height / reduced.count
    }
    return result;
}

db.people.mapReduce(
    mapFunction,
    reduceFunction, {
        out: "map_reduce_zapytanie_1",
        finalize: finalizeFunction
    }
)

printjson(db.map_reduce_zapytanie_1.find({}).toArray())