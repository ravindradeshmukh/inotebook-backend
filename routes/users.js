var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
mongoose.connect("mongodb://localhost:27017/inotebook");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /* get user details. */
router.get("/view", function (req, res, next) {
  res.send("user details");
});

router.post(
  "/save",
  body("name", "Enter valid name").isLength({ min: 3 }),
  body("email", "Enter valid email").isEmail(),
  body("password", "Enter valid password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    let exists = await User.findOne({ email: user.email });
    console.log(exists);
    if (exists) {
      return res.status(400).json({ errors: "Email already exists" });
    }
    try {
      await User.create(user);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
);

router.post(
  "/update",
  body("name", "Enter valid name").isLength({ min: 3 }),
  body("email", "Enter valid email").isEmail(),
  body("password", "Enter valid password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new User({
      _id: req.body._id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
    let exists = await User.findOne({_id: user._id });
    console.log(exists);
    if (exists) {
      let emailExists = await User.findOne({ email: user.email, _id: {$ne: user._id} });
      console.log(emailExists);
      if (emailExists) {
        return res.status(400).json({ errors: "Email already exists" });
      }
      try {
        let sdfs = await User.updateOne({_id: user._id},{name:user.name,email:user.email,password:user.password});
      console.log("dsfsdfsdf");
        
        res.json(user);
      } catch (error) {
      console.log("234234324");

        res.json(error);
      }
    } else {
      return res.status(400).json({ errors: "User does not exists" });
    }
  }
);

module.exports = router;
