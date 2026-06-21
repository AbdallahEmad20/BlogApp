const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret_key", {
    expiresIn: "30d",
  });
};

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already in use",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
   
    });
   

     const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
   
      
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};



const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred during login",
      error: error.message,
    });
  }
};
module.exports = {Register ,  Login};
