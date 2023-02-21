const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      //   untuk password = confirmPassword
      // if (password !== confirmPassword) throw `Wrong Password`;
      //   untuk password minimum 8 characters
      if (password.length < 8) throw `Minimum 8 characters`;
      //   proses hash password
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      //   untuk yang perlu diinput
      const data = await user.create({
        username,
        email,
        password: hashPass,
        isVerified: true
      });
      //   proses pengiriman token
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
      const isUserExist = await user.findOne({
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
      const result = await user.findOne({
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
  findAllUser: async (req, res) => {
    try {
      const users = await user.findAll({
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
