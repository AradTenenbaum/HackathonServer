const router = require("express").Router();
const verify = require('../utils/verifyToken');
const Resource = require('../model/Resource');

// Add resource - name, kitchenID, price, calories
router.post('/add', verify, async (req, res) => {
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

// Get all of kitchen's resources - kitchenID
router.get('/all', verify, async (req, res) => {
    const allResources = await Resource.find({kitchenID: req.body.kitchenID});
    if(allResources.length === 0) return res.status(400).send('No resourses yet');
    res.send(allResources);
});

// Delete resource
router.delete('/delete/:resourceID', verify, async (req, res) => {
    try {
        const removedResource = await Resource.deleteOne({_id: req.params.resourceID});
        res.send(removedResource);
    } catch (error) {
        res.status(400).send(error);
    } 
});

module.exports = router;
