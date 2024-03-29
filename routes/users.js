const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Kitchen = require("../model/Kitchen");


// Register - personalID, password, kitchenName
router.post("/register", async (req, res) => {
  // Check if user exists
  const personalIDExist = await User.findOne({ personalID: req.body.personalID });
  if (personalIDExist) return res.status(400).send("PersonalID already exists");
  // Check if password is valid
  let password = req.body.password;
  let regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
  if (!regex.test(password)) {
    return res
      .status(400)
      .send("Password must contain 1 lower case, 1 upper case, 1 number and minimum 6 digits");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Get kitchen
  const kitchen = await Kitchen.findOne({name: req.body.kitchenName});
  // Check if kitchen exists
  if(!kitchen) return res.status(400).send('Kitchen not exists');
  // Check if cook
  const isInCookList = kitchen.workersList.find((worker) => worker === req.body.personalID);
  // Create User
  const user = new User({
    personalID: req.body.personalID,
    kitchenID: kitchen._id,
    password: hashedPassword,
    isCook: isInCookList ? true : false
  });
  // Save user to DB
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
    // Check if personalID exists
    const personalIDExist = await User.findOne({ personalID: req.body.personalID });
    if (!personalIDExist) return res.status(400).send("PersonalID has no user");
    // Compare passwords
    const validPass = await bcrypt.compare(req.body.password, personalIDExist.password);
    if(!validPass) return res.status(400).send('Password is wrong'); 
    // Create a token and return
    const token = jwt.sign({_id: personalIDExist._id}, process.env.TOKEN_SECRET);
    res.send({
        token,
        personalIDExist
    });
});


module.exports = router;