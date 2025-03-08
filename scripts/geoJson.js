const connection = new Mongo(`localhost:27017`),
  db = connection.getDB(`Aliens`);
(aliensColl = db.getCollection(`UFO`)), (geoColl = db.getCollection(`geoUFO`));

// geoColl.deleteMany({});

//copy collection UFO to geoUFO
// let count = 0;
// aliensColl.find().forEach((doc) => {
//   geoColl.insertOne(doc);
//   count++;
//   print(count);
// });

// print(count);
// print(`document count; ${geoColl.countDocuments()}`);

// let result;

// result = geoColl.updateMany({}, [
//   {
//     $set: {
//       location: {
//         type: "Point",
//         coordinates: ["$city_longitude", "$city_latitude"],
//       },
//     },
//   },
// ]);
// print(result);

// geoColl.createIndex({ location: "2dsphere" });

//show index
// print(`\n index`);
// print(geoColl.getIndexes());

//sightings near Rochester
// print(`sightings near Rochester`);
// geoColl
//   .find(
//     {
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [-77.6064018064519, 43.15634212327678],
//           },
//           $maxDistance: 5000,
//         },
//       },
//     },
//     {
//       _id: 1,
//       city: 1,
//       text: 1,
//       posted: 1,
//     }
//   )
//   .forEach((doc) => {
//     print(doc);
//   });
