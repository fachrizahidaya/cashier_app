const db = require("../models")
const item = db.Item

module.exports = {
    create: async (req, res) => {
        try {
            
        } catch (err) {
            console.log(err)
            res.status(400).send(err)

        }
    }
}