const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET || "123";

exports.login = async (req, res) => {
  try {
    const { email, password, roleType } = req.body;
    const user = await User.findOne({ email, roleType });

    if (!user)
      return res.status(404).json({
        resultCode: 1,
        resultMessage: "User not found or invaliad role",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, roleType: user.roleType },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      resultCode: 0,
      resultData: {
        user: { roleType: user.roleType, email: user.email, userId: user._id },
        token: token,
      },
      resultMessage: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ resultCode: 1, resultMessage: "Error during login process" });
  }
};

exports.registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, mobileNo, email, address, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      mobileNo,
      email,
      address,
      password: hashedPassword,
      roleType: "customer",
    });

    res.status(201).json({
      resultCode: 0,
      resultData: newUser._id,
      resultMessage: "Customer registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ resultCode: 1, resultMessage: "Error registering new customer" });
  }
};
