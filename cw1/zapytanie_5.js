printjson( db.people.find({ birth_date: { "$gte":"2000-01-01T00:00:00Z", "$lte":"2099-12-31T23:59:59Z" }}).toArray())