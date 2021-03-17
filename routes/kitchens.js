const router = require("express").Router();
const Kitchen = require("../model/Kitchen");

// Add kitchen - name, workerList
router.post('/add', async (req, res) => {
    // Create kitchen
    const kitchen = new Kitchen({
        name: req.body.name,
        workersList: req.body.workersList
    });
    // Save db
    try {
        const savedKitchen = await kitchen.save();
        res.send(savedKitchen);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;