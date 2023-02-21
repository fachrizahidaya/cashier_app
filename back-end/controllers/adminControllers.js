const db = require("../models");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (password.length < 8) throw `Mininum 8 characters`;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const data = await admin.create({
        username,
        email,
        password: hashPass,
        isAdmin: true,
      });
      const token = jwt.sign({ username: username }, "riza");
      res.status(200).send({
        message: "Register success",
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const isUserExist = await admin.findOne({
        where: {
          username: username ? username : "",
        },
        raw: true,
      });
      if (!isUserExist) throw `User not found`;
      const payload = { username: isUserExist.username };
      const token = jwt.sign(payload, "riza");
      const isValid = await bcrypt.compare(password, isUserExist.password);
      if (!isValid) throw `Wrong password`;

      res.status(200).send({
        message: "Login success",
        isUserExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "riza");
      const result = await admin.findOne({
        where: {
          username: verify.username,
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
