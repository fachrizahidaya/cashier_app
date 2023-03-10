const db = require("../models");
const item = db.Item;
const { Op } = require("sequelize");
const category = db.Category;
const productCategory = db.Product_Category;
const cart = db.Cart;

module.exports = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const data = await category.create({
        name,
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, CategoryId, price } = req.body;
      const data = await item.create({
        name,
        description,
        CategoryId,
        price,
      });

      const result = await item.findAll({
        where: {
          id: data.id,
        },
      });

      result.map(async (item) => {
        await productCategory.create({
          CategoryId: CategoryId,
          ItemId: item.id,
        });
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await item.findAll({
        attributes: ["id", "name", "price", "picture"],
        include: [
          { model: productCategory, include: [{ model: category }] },
          { model: cart },
        ],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findCategory: async (req, res) => {
    try {
      const data = await category.findAll({
        include: [{ model: productCategory }],
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  itemPic: async (req, res) => {
    try {
      let fileUploaded = req.file;

      await item.update(
        {
          picture: `Public/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await item.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, price, description, CategoryId } = req.body;

      await item.update(
        {
          name,
          price,
          CategoryId,
        },
        {
          where: { id: req.params.id },
        }
      );
      const data = await item.findOne({ where: { id: req.params.id } });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await category.update(
        {
          name,
        },
        {
          where: { id: req.params.id },
        }
      );
      const data = await category.findOne({ where: { id: req.params.id } });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await item.destroy({
        where: {
          id: req.params.id,
        },
      });
      const data = await item.findAll({});
      res.status(400).send("Item deleted");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  removeCategory: async (req, res) => {
    try {
      await category.destroy({
        where: {
          id: req.params.id,
        },
      });
      const data = await item.findAll({});
      res.status(400).send("Category deleted");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  paginationProduct: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort, orderPrice, sortPrice } =
        req.query;
      const list_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * list_page;
      const orderby = order || "price" || "name";
      const orderby2 = orderPrice || "price";
      const direction = sort || "ASC";
      const direction2 = sortPrice || "ASC";
      const totalRows = await item.count({
        where: {
          price: {
            [Op.like]: "%" + search + "%",
          },
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        include: [{ model: productCategory, include: [{ model: category }] }],
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await item.findAll({
        where: {
          price: {
            [Op.like]: "%" + search + "%",
          },
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
        include: [{ model: productCategory, include: [{ model: category }] }],
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        orderPrice: [[orderby2, direction2]],
      });

      res.status(200).send({
        result: result,
        page: list_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findByCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const response = await category.findAll({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "name"],
        include: [
          {
            model: productCategory,
            attributes: ["CategoryId"],
            include: [{ model: item, attributes: ["name"] }],
          },
        ],
      });
      console.log(response);
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
