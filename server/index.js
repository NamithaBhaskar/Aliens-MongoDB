const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const request = require('request');
const app = express();
app.use(cors());
app.use(express.json());
const url = `mongodb://mongouser:huMONGOu5@localhost:27017/Aliens`;
const { Readable } = require("stream");
const fs = require("fs");
const { GridFSBucket } = require("mongodb");
var Grid = require("gridfs-stream");
const path  = require('path')
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.get('/', (req, res)=>{
//   res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
// })

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));

let gfs;
const connection = mongoose.createConnection(url);
connection.once("open", () => {
  gfs = new GridFSBucket(connection.db, { bucketName: "fs" });
  console.log("GridFS Connected");
});

const sightingSchema = new mongoose.Schema({
  summary: String,
  country: String,
  city: String,
  state: String,
  date_time: String,
  shape: String,
  duration: String,
  stats: String,
  report_link: String,
  text: String,
  posted: String,
  city_latitude: Number,
  city_longitude: Number,
});

const Sighting = mongoose.model("geoUFO", sightingSchema, "geoUFO");

const commentSchema = new mongoose.Schema({
  report_id: String,
  comment: String,
  username: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

app.get("/getSightings", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided or invalid
  const reports = await Sighting.find({}).limit(limit);
  res.json(reports);
});

// app.get("/getSightings/:reportId", async (req, res) => {
//   try{
//   val = req.params.reportId;
//   const files = await gfs.find({ "report_id": val }).toArray();
//   console.log(files);
//   if(!files || files.length ===0 ){
//     return res.status(404).json({error: "No images found for given report ID"})
//   }
//   const imageStreams = files.map(file=>{
//     const stream = gfs.openDownloadStreamByName(file.filename);
//     return {stream, contentType: file.contentType};
//   })

//   res.set({
//     'Content-Type': 'multipart/mixed; boundary=boundaryboundary'
//   });

//   imageStreams.forEach(({stream, contentType})=>{
//     console.log(stream);
//     res.write(--boundaryboundary\r\n);
//     res.write(Content-Type: ${contentType}\r\n\r\n);
//     stream.pipe(res, {end: false});
//     stream.on('end', ()=>{
//       res.write('\r\n');
//       res.write(--boundaryboundary\r\n);
//     });
//   });
//   res.end(--boundaryboundary--\r\n); // End the multipart respons
// }catch(error){
//   console.error("Error:", error);
//   res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/getComments/:reportId", async (req, res) => {
  try {
    const val = req.params.reportId;
    const comments = await Comment.find({ report_id: val });

    res.json({ comments });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.get("/getSightings/:reportId", async (req, res) => {
  try {
    const val = req.params.reportId;

    const files = await gfs.find({ report_id: val }).toArray();
    
    if (!(!files || files.length === 0)) {
      const fileStream = gfs.openDownloadStreamByName(files[0].filename);
      let data = '';
      fileStream.on('data', chunk => {
        data += chunk.toString('base64'); // Convert each chunk to base64 string
      });
      fileStream.on('end', () => {
        const base64Image = `data:image/jpeg;base64,${data}`; // Assuming JPEG format
        res.json({ base64Image }); // Send image and comments as JSON
      });
    } else {
      const files = await gfs.find({ report_id: "default" }).toArray();
      const fileStream = gfs.openDownloadStreamByName(files[0].filename);
      let data = '';
      fileStream.on('data', chunk => {
        data += chunk.toString('base64'); // Convert each chunk to base64 string
      });
      fileStream.on('end', () => {
        const base64Image = `data:image/jpeg;base64,${data}`; // Assuming JPEG format
        res.json({ base64Image }); // Send image and comments as JSON
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const images = [];
    const cursor = db.collection("fs.files").find({}).sort({ _id: -1 });

    await cursor.forEach(async (item) => {
      const img = await bucket.openDownloadStream(item._id).toArray();
      const encoded_string = Buffer.from(img[0].buffer).toString("base64");
      images.push({
        encoded_string: encoded_string,
        filename: item.filename,
        metadata: item.metadata,
      });
    });

    res.render("index", { images: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/searchSighting", (req, res) => {
  const pageSize = 10;
  const words = req.query.param.split(" ");
  const page = parseInt(req.query.page) || 1;
  console.log(words);
  let regexInpt = [];
  words.forEach((word) => {
    regexInpt.push({ summary: {$regex : new RegExp(word.trim(), 'i') }});
  });
  
  Sighting.find({
    $and: regexInpt
  })
    .skip(pageSize * page - 1)
    .limit(pageSize)
    .then(function (sightings) {
      if (sightings.length === 0) {
        console.log("No sightings found.");
      }
      res.json(sightings);
    })
    .catch(function (err) {
      console.log("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

function extractReportIdFromUrl(url) {
  const match = url.match(/\/(\w+)\.html/);
  return match ? match[1] : null;
}



app.post("/addComment", async (req, res) => {
  console.log(req.body);
  const { report_id, comment, username } = req.body;
  const finalUsername = username || "Anonymous"; 

  if (!comment) {
    return res.status(400).json({ error: "comment is required" });
  }

  try {
    const newComment = new Comment({ report_id, comment, username: finalUsername });
    await newComment.save(); // Use await to wait for the comment to be saved
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// TODO Fetching the latitude and longitude
app.get("/searchSightingLocation", (req, res) => {
  const pageSize = 10;
  const city = req.query.city || "Emerson";
  const state = req.query.state || "NJ";
  const page = parseInt(req.query.page) || 1;

  if (!city || !state) {
    return res.status(400).json({ error: 'City and state must be provided' });
  }

  const url = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=US&state=${state}`;

  request.get({
    url: url,
    headers: {
      'X-Api-Key': '4i/LMlZ4ItnOMr1X9MPo0g==kXSqfgTep5IasfVw'
    },
  }, function (error, response, body) {
    if (error) {
      console.error("Request failed: ", error);
      return res.status(500).json({ error: 'Internal server error' });
    } else if (response.statusCode != 200) {
      console.error('Error:', response.statusCode, body.toString('utf8'));
      return res.status(response.statusCode).json({ error: body.toString('utf8') })
    } else {
      const data = JSON.parse(body);
      if (data.length > 0) {
        Sighting.find(
          {
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [data[0].longitude, data[0].latitude],
                },
                $maxDistance: 10000,
              },
            },
          })
          .skip(pageSize * page - 1)
          .limit(pageSize)
          .then(function (sightings) {
            if (sightings.length === 0) {
              console.log("No sightings found.");
            }
            res.json(sightings);
          })
          .catch(function (err) {
            console.log("Error:", err);
            res.status(500).json({ error: "Internal Server Error" });
          });
      }
    }
  });
});
