const router = require("express").Router();
const Resource = require('../model/Resource');

// Add resource - name, kitchenID, price, calories
router.post('/add', async (req, res) => {
    // Check if kitchen has this resource
    const resourceExist = await Resource.findOne({kitchenID: req.body.kitchenID, name: req.body.name});
    if(resourceExist) return res.status(400).send('Resource already exists');
    // Build resource
    const resource = new Resource({
        name: req.body.name,
        kitchenID: req.body.kitchenID,
        price: req.body.price,
        calories: req.body.calories
    });
    // Save to db
    try {
        const savedResource = await resource.save();
        res.send({resource});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all of kitchen

module.exports = router;
