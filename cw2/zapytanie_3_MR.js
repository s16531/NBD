var mapFunction = function() {
    emit(this.job, "");
};
var reduceFunction = function(job, jobVal) {
    return jobVal[0];
};
db.people.mapReduce(
    mapFunction,
    reduceFunction, {
        out: "map_reduce_zapytanie_3"
    }
)

printjson(db.map_reduce_zapytanie_3.find().sort({ _id: 1 }).toArray())

