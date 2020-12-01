import express from "express";
import redis from "redis";
import pkg from "sequelize";
import http from "http";
import cors from "cors";
const { DataTypes, Sequelize } = pkg;
const sequelize = new Sequelize("database", "postgres", "postgres", {
  host: "db",
  dialect: "postgres",
});
const Result = sequelize.define(
  "Result",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
  }
);

import socketIo from "socket.io";
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
const subscriber = redis.createClient({
  host: "redis",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

subscriber.subscribe("voto");
io.on("connection", (socket) => {
  subscriber.on("message", (channel, message) => {
    console.log(message);
    Result.findOrCreate({
      where: { name: message },
      defaults: { name: message },
    }).then((result) => {
      Result.update(
        { vote: result[0].vote + 1 },
        { where: { name: message } }
      ).then((response) => {
        Result.findAll({ order: [["name", "DESC"]] }).then((candidates) => {
          console.log(candidates);
          return io.emit("teste", candidates);
        });
      });
    });
  });
});

app.get("/", async (req, res) => {
  // const backend = await Result.count({where: {name: "Back-end"}});
  // const frontend = await Result.count({where: {name: "Front-end"}});

  // return res.json({backend, frontend, total: frontend+backend});
  const candidates = await Result.findAll({ order: [["name", "DESC"]] });
  console.log(candidates);
  return res.json({ candidates });
});

sequelize.sync().then(() => {
  server.listen(4444, () => console.log("Backend running"));
});
