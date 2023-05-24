const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Redis = require("redis");
const redisClient = Redis.createClient();
// run();
// Create Redis client
// const redisClient = Redis.createClient({
//   host: "127.0.0.1", // Update with your Redis server host
//   port: 6379, // Update with your Redis server port
//   // password: "yourpassword", // Uncomment and provide Redis password if required
// });

// redisClient.on("error", (err) => {
//   console.error("Redis connection error:", err);
// });

const DEFAULT_EXPIRATION = 10;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos`,
      { params: { albumId } }
    );
    return data;
  });

  res.json(photos);
});

//! convention in redis must specify namespace like this `photos:XXX` use ":"
app.get("/photos/:id", async (req, res) => {
  const photos = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });

  res.json(photos);
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);

      if (data != null) return resolve(JSON.parse(data));

      const freshData = await cb();
      redisClient.set(key, JSON.stringify(freshData), (error) => {
        if (error) {
          console.error("Redis set error:", error);
        } else {
          redisClient.expire(key, DEFAULT_EXPIRATION);
          resolve(freshData);
        }
      });
    });
  });
}

app.listen(3000, () => {
  console.log("listening on port 3000");
});
