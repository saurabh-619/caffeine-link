const express = require("express");
const router = express.Router();
const request = require("request");
const { githubClientID, githubClientSecret } = require("../../config/keys");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const isAuthenticated = require("../../middleware/auth");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// @route   GET api/profile/me
// @desc    Get logged in user's profile
// @access  Private
router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ error: "No profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   POST api/profile/
// @desc    Create or Update profile
// @access  Private
router.post(
  "/",
  isAuthenticated,
  check("status", "Status is required").isLength({ min: 1 }),
  check("skills", "Skill is required").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    console.log(req.body);
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // Build profile object
    let profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => {
        return skill.trim();
      });
    }

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // if profile is present then update it
      if (profile) {
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          profileFields,
          { new: true }
        );
        return res.status(200).json({
          msg: "User-Profile updated successfully ",
          profile: updatedProfile,
        });
      }

      // if profile is not present then create it
      const createdProfile = new Profile(profileFields);

      const savedProfile = await createdProfile.save();

      return res.status(200).json({
        msg: "User-Profile created successfully ",
        profile: savedProfile,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  isAuthenticated,
  check("title", "Title is required").isLength({ min: 1 }),
  check("company", "Company is required").isLength({ min: 1 }),
  check("from", "From date is required").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp); //unshift pushes profile in experience array at top
      await profile.save();

      res.status(200).json({
        msg: "Experience added to Profile  successfully ",
        profile: profile,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   DELETE api/profile/experience/:expId
// @desc    Delete a experience from profile
// @access  Private
router.delete("/experience/:expId", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json({
      msg: "experience removed",
      profile,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  isAuthenticated,
  check("school", "School is required").isLength({ min: 1 }),
  check("degree", "Degree is required").isLength({ min: 1 }),
  check("fieldofstudy", "Fieldofstudy is required").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu); //unshift pushes profile in experience array at top
      await profile.save();

      res.status(200).json({
        msg: "Education added to Profile  successfully ",
        profile: profile,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   DELETE api/profile/education/:eduId
// @desc    Delete a education from profile
// @access  Private
router.delete("/education/:eduId", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json({
      msg: "Education removed",
      profile,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET api/profile/github/:username
// @desc    GET user repos
// @access  Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };

    request(options, (error, response, body) => {
      if (error) {
        return console.log(err);
      }
      if (response.statusCode !== 200) {
        return res.status(400).json({
          error: "No Github Profile found ",
        });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/profile/
// @desc    GET all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    return res.status(200).json({
      profiles: profiles,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET api/profile/user/:userId
// @desc    GET a perticular user's  profile
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const profile = await Profile.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ error: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   DELETE api/profile/
// @desc    Delete User and hence his profile & posts
// @access  Private
router.delete("/", isAuthenticated, async (req, res) => {
  try {
    // remove posts
    await Post.deleteMany({ user: req.user.id });

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    return res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   PUT api/profile/profilePhoto/upload
// @desc    add profile picture
// @access  Private
router.put("/profilePhoto/upload", isAuthenticated, async (req, res) => {
  // find logged in user

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    const loggedInUser = await User.findById(req.user.id);
    form.parse(req, async (err, fields, file) => {
      if (err) {
        return res.status(400).json({ error: "Profile Photo not uploaded" });
      }
      console.log(file);

      // handle fields

      // handle file
      if (file.profilePhoto) {
        if (file.profilePhoto.size > 1024 * 1024) {
          return res
            .status(400)
            .json({ error: "Profile Photo exceeded max size of 1MB" });
        }
        loggedInUser.profilePhoto.data = fs.readFileSync(
          file.profilePhoto.path
        );
        loggedInUser.profilePhoto.contentType = file.profilePhoto.type;
        const user = await loggedInUser.save();
        res.json(user);
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET api/profile/profilePhoto
// @desc    add profile picture
// Get photo
router.get("/profilePhoto/:userId", async (req, res, next) => {
  const loggedInUser = await User.findById(req.params.userId);
  if (loggedInUser.profilePhoto.data) {
    res.set("Content-Type", loggedInUser.profilePhoto.contentType);
    return res.send(loggedInUser.profilePhoto.data);
  }
  next();
});

// @route   PUT api/profile/certificate/upload
// @desc    add certificate picture
// @access  Private
router.put("/certificate/upload", isAuthenticated, async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    // find logged in user's profile
    const profile = await Profile.findOne({ user: req.user.id });
    form.parse(req, async (err, fields, file) => {
      if (err) {
        return res.status(400).json({ error: "Profile Photo not uploaded" });
      }
      console.log(file);

      // handle fields
      const { description } = fields;
      if (!description) {
        return res.status(500).json({ error: "Please add your exerience... " });
      }
      // handle file
      if (file.photo) {
        if (file.photo.size > 1024 * 1024) {
          return res
            .status(400)
            .json({ error: "Profile Photo exceeded max size of 1MB" });
        }
        const photo = {
          data: fs.readFileSync(file.photo.path),
          contentType: file.photo.type,
        };
        const certificate = {
          photo,
          description,
        };
        // console.log(certificate);
        profile.certificates.unshift(certificate);
        const profileSaved = await profile.save();
        res.json(profileSaved);
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET api/profile/certificate
// @desc    GET certificate picture
router.get("/certificate/:userId/:certificateId", async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId });

  if (profile.certificates.length > 0) {
    profile.certificates.forEach((certificate) => {
      if (certificate._id.toString() === req.params.certificateId) {
        res.set("Content-Type", certificate.photo.contentType);
        return res.send(certificate.photo.data);
      }
    });
  }
  next();
});

// @route   DELETE api/profile/certificate/:userId/:certificateId
// @desc    Delete a certificate from profile
// @access  Private
router.delete(
  "/certificate/:userId/:certificateId",
  isAuthenticated,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.params.userId });

      // get remove index
      const removeIndex = profile.certificates
        .map((item) => item._id)
        .indexOf(req.params.certificateId);

      profile.certificates.splice(removeIndex, 1);

      await profile.save();

      res.json({
        msg: "Certificate removed",
        profile,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
