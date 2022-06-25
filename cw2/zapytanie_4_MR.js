var mapFunction = function() {
    var bmi = Number(this.weight) / Number((this.height / 100) * (this.height / 100));
    emit(this.nationality, {
        count: 1,
        BMI: bmi,
        minBMI: bmi,
        maxBMI: bmi
    });
};

var reduceFunction = function(nationality, data) {
    var ret = { BMI: 0, maxBMI: 0, minBMI: data[0].minBMI, count: 0 };
    data.forEach(e => {
        ret.count += e.count
        ret.BMI += e.BMI
        ret.minBMI = e.minBMI < ret.minBMI ? e.minBMI : ret.minBMI
        ret.maxBMI = e.maxBMI > ret.maxBMI ? e.maxBMI : ret.maxBMI
    })
    return ret;
}

var finalizeFunction = function(nationality, reducedData) {
    return {
        maxBMI: reducedData.maxBMI,
        minBMI: reducedData.minBMI,
        avgBMI: reducedData.BMI / reducedData.count
    };
}

db.people.mapReduce(
    mapFunction,
    reduceFunction, {
        out: "map_reduce_zapytanie_4",
        finalize: finalizeFunction
    }
)

printjson(db.map_reduce_zapytanie_4.find({}).toArray())