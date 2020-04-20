const router = require("express").Router();
const isAuthenticated = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/keys");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user.id).select("-password");
    res.json({
      msg: "User is Logged in",
      user: loggedInUser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
});

// @route   POST api/auth/
// @desc    Authenticate user & get token(Login route)
// @access  Public
router.post(
  "/",
  check("email", "Enter the email please").isEmail(),
  check("password", "Enter the password please").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(400).json({
          error: "User with given email doesn't exist",
        });
      }

      // check password
      const isSame = await bcrypt.compare(password, foundUser.password);
      if (!isSame) {
        return res.status(400).json({
          error: "Incorrect Password",
        });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: foundUser._id,
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
