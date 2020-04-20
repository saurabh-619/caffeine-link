const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/keys");
const User = require("../../models/User");

// @route   POST api/users/
// @desc    Resister user
// @access  Public
router.post(
  "/",
  check("name", "Name should be given").isLength({ min: 1 }),
  check("email", "Email should be given").isEmail(),
  check("password", "Password should be at least 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        return res.status(400).json({
          error: "User already exist",
        });
      }

      // Get user Gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" }); //r(rating) = pg(no adult things)

      const newUser = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: newUser._id,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json(token);
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
