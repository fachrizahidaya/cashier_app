const db = require("../models");
const cart = db.Cart;
const transaction = db.Transaction;
const item = db.Item;

module.exports = {
  create: async (req, res) => {
    try {
      const { ItemId, UserId } = req.body;
      if (!UserId) throw `You have to login first`;
      const data = await cart.create({
        ItemId,
        UserId,
        qty: 1,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await cart.destroy({
        where: { id },
      });
      res.status(200).send("Delete success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateQty: async (req, res) => {
    try {
      const { id, qty } = req.body;
      const response = await cart.findOne({
        where: [
          {
            UserId: req.params.id,
          },
          {
            id,
          },
        ],
        include: [{ model: item, attributes: ["price"] }],
        raw: true,
      });
      console.log(response);
      const data = await cart.update(
        {
          qty,
          totalCheckout: qty * response["Item.price"],
        },
        {
          where: { id },
        }
      );
      res.status(200).send("Update success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  
};
