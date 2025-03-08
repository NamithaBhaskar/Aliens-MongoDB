const connection = new Mongo(`localhost:27017/Aliens`);
const db = connection.getDB('Aliens');
db.auth("mongoadmin", "huMONGOu5");
const UFOColl = db.getCollection('geoUFO');

UFOColl.find().forEach(sighting => {
    const report_link_tail = sighting.report_link.split("/")[6]
    const report_id = report_link_tail.split(".")[0]
    UFOColl.updateOne({_id: sighting._id}, {
        $set: {
            report_id: report_id
        }
    })
});

print(UFOColl.findOne())