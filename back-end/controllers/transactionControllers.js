const db = require("../models");
const cart = db.Cart;
const transaction = db.Transaction;
const item = db.Item;
const transactionDetail = db.Transaction_Detail;

module.exports = {
  create: async (req, res) => {
    try {
      const { ItemId, UserId } = req.body;
      if (!UserId) throw `You have to login first`;
      const data = await cart.create(
        {
          ItemId,
          UserId,
          qty: 1,
        }
        // {
        //   include: [{ model: item}],
        // }
      );
      // await item.findOne({
      //   where: {
      //     id: ItemId,
      //   },
      // });
      // await cart.create({
      //   totalCheckout: data
      // })
      console.log(data);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
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

  findCartByUser: async (req, res) => {
    try {
      const data = await cart.findAll({
        where: {
          UserId: req.params.id,
        },
        include: [{ model: item, attributes: ["name", "price"] }],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findTotalByUser: async (req, res) => {
    try {
      const data = await cart.findAll({
        where: [
          { UserId: req.params.id },
          // {
          //   status: 1,
          // },
        ],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findCheckoutByUser: async (req, res) => {
    try {
      const data = await cart.findAll({
        where: [
          {
            UserId: req.params.id,
          },
          // {
          //   status: 1
          // }
        ],
        include: [{ model: item }],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalCheckoutByUser: async (req, res) => {
    try {
      const response = await cart.findOne({
        where: {
          UserId: req.params.id,
        },
      });
      const { id, qty, price } = req.body;
      const data = await cart.update(
        {
          qty,
          price,
        },
        {
          where: { id },
        }
      );
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createOrder: async (req, res) => {
    let date = new Date();
    date.setDate(date.getDate());
    try {
      let year = date.getFullYear();
      const order = await transaction.findAll({});
      const order_no = `C-${year}${order.length + 1}`;
      const { totalOrder, UserId } = req.body;
      const data = await transaction.create({
        totalOrder,
        UserId,
        invoice_no: order_no,
      });
      console.log(data);
      const response = await cart.findAll({
        where: [{ UserId: req.params.id }],
        include: [{ model: item }],
      });
      console.log(response);
      response.map(async (item) => {
        item.dataValues;
        await transactionDetail.create({
          TransactionInvoiceNo: data.invoice_no,
          ItemId: item.dataValues.ItemId,
          totalCheckout: item.dataValues.totalCheckout,
          qty: item.dataValues.qty,
        });
      });

      response.map(async (item) => {
        await cart.destroy({
          where: {
            id: item.dataValues.id,
          },
        });
      });
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findOrderByUser: async (req, res) => {
    try {
      const data = await transaction.findAll(
        {
          where: {
            UserId: req.params.id,
          },
          include: [{ model: transactionDetail }],
        },
        {
        }
      );
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findProductByOrder: async (req, res) => {
    try {
      const data = await transactionDetail.findAll({
        where: {
          TransactionInvoiceNo: req.body,
        },
        include: [{ model: item }],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
