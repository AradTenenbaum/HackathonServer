const router = require("express").Router();
const verify = require("../utils/verifyToken");
const Poll = require("../model/Poll");

// Create a poll - kitchenID, resourceList
router.post("/upload", verify, async (req, res) => {
  // Create a poll
  const poll = new Poll({
    kitchenID: req.body.kitchenID,
    resourceList: req.body.resourceList,
  });
  // Save to db
  try {
    const savedPoll = await poll.save();
    res.send(savedPoll);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all history results - kitchenID
router.get("/history", verify, async (req, res) => {
  try {
    // Get all from db
    const polls = await Poll.find({ kitchenID: req.body.kitchenID });
    // Check if exists
    if (polls.length === 0) return res.status(400).send("No polls available");
    // Send to client
    res.send(polls);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get today's results - kitchenID
router.get("/results", verify, async (req, res) => {
  try {
    // Get last from db
    const polls = await Poll.find({ kitchenID: req.body.kitchenID });
    // Check date
    let todaysPolls = polls.filter(
      (poll) =>
        new Date(Date.now()).setHours(0, 0, 0, 0) ===
        new Date(poll.date).setHours(0, 0, 0, 0)
    );
    // Check if exists
    if (todaysPolls.length === 0) return res.status(400).send("No polls today");
    // Send to client
    res.send(todaysPolls);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
