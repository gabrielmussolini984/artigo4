import express from "express";
import redis from "redis";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const publisher = redis.createClient({
  host: "redis",
});

app.post("/", (req, res) => {
  publisher.publish("voto", req.body.voto);
  return res.json({ message: "voto computado" });
});

app.listen(3333, () => console.log("Redis running"));
