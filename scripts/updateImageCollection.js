const connection = new Mongo(`localhost:27017/Aliens`);
const db = connection.getDB('Aliens');

db.auth("mongoadmin", "huMONGOu5");

const imageColl = db.getCollection(`fs.files`);

imageColl.find().forEach((doc) => {
  const metadata = doc.filename.slice(0, doc.filename.indexOf("-"));
  imageColl.updateOne(
    {
      _id: doc._id,
    },
    {
      $set: { report_id: metadata },
    }
  );
});