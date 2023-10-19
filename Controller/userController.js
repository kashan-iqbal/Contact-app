const User = require("../model/usermodel");
const asycnHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register user
//@get /api/user
//@access public

const registeruser = asycnHandler(async (req, res) => {
  const { username, usernamelast, password, email,phoneNumber } = req.body;
  if (!username || !password || !email || !usernamelast || !phoneNumber) {
    return res.send({ message: "All field are nessacery" });
  }
  const avaibleuser = await User.findOne({ email });
  if (avaibleuser) {
    return res
      .status(201)
      .send({ message: "user with this email is alredy exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    usernamelast,
    phoneNumber,
    password: hashedPassword,
  });

  if (user) {
    return res.status(200).send({ user, success: true });
  } else {
    res.send({ message: "user data data invalid" });
  }
});

//@desc login user
//@get /api/user
//@access public

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "all the fiel are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(402).json({ message: "email is in correct" });
    return;
  }
  //   check hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "300m" }
    );
    res.status(201).send({ accessToken, user });
  } else {
    res.status(401).json({ message: "your password is incorrect" });
    return;
  }
};

//@desc curent user
//@get /api/user
//@access private

const currentUser = (req, res) => {
  res.status(201).json(req.user);
};

//@desc update password
//@get /api/user
//@access private

const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      }
    );
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  currentUser,
  loginuser,
  registeruser,
  updatePassword,
};
