const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).send("Please fill the form properly.");
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).send("User already exist");
    }
    const hashedpassword = await bcrypt.hash(password, 12); // data encryption
    const user = new User({
      name,
      email,
      password: hashedpassword,
      avatar: { public_id: "sample_id", url: "sampleurl" },
    });
    await user.save();
    return res.status(201).send("User registration succesfully ");
  } catch (error) {
    return res.status(200).send("Unexpected Error .Please try again later");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Please fill the form correctly.");
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json("No user found.");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      res.status(400).json("Invalid credentials");
    }
    // -- jwt auth token --
    let token = await jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).cookie("token", token).json({
      success: true,
      existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Bad Request. Try again later");
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      const randomString = randomstring.generate();
      const data = await User.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      res
        .status(200)
        .send({
          success: true,
          msg: "please check your inbox of mail and reset your password.",
        });
    } else {
      res
        .status(200)
        .send({ success: true, msg: "This email does not exists." });
    }
  } catch (error) {}
};

module.exports = {
  register,
  login,
  logout,
  forgetPassword,
};
