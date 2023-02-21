const db = require("../models");
const item = db.Item;
const category = db.Category;
const productCategory = db.Product_Category;

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
        include: [{ model: productCategory, include: [{ model: category }] }],
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
};
