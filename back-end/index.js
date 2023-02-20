const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

server.use(express.json());
server.use(cors());
server.use(bearerToken());

const { userRouters, adminRouters } = require("./routers");
server.use("/user", userRouters);
server.use("/admin", adminRouters);

server.listen(PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Success running at PORT ${PORT}`);
});
