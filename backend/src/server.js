import express from "express";
import redis from "redis";
import  pkg from 'sequelize';
import http from 'http'
import cors from 'cors'
const {DataTypes, Sequelize} = pkg;
const sequelize = new Sequelize("database", "postgres", "postgres", {
  host: "db",
  dialect: "postgres",
});
const Result = sequelize.define('Result', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vote: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  // Other model options go here
});

import socketIo from 'socket.io';
const app = express();
const server = http.createServer(app);
const io = socketIo(server)



app.use(cors())
const subscriber = redis.createClient({
  host: "redis",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');
  subscriber.on("message", async (channel, message) => {
    const candidate = await Result.findOrCreate({where:{name: message}});
    await Result.update({vote: candidate[0].vote + 1},{where: {name: candidate[0].name}});
    
    const candidates = await Result.findAll();
    
    io.emit('teste', candidates)
  });
});

subscriber.subscribe("voto");


app.get("/", async (req, res) => {
  
  return res.json(candidates);
});

sequelize.sync().then(() => {
  server.listen(4444, () => console.log("Backend running"));
})

