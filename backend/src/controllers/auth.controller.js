import userModel from "../models/user.model.js";
import Jwt from "jsonwebtoken";
import config from "../config/config.js";
import {
  generateVerificationToken,
  verifyVerificationToken,
} from "../utils/jwt.utils.js";
import sendVerificationEmail from "../services/email.service.js";

const sendTokenResponse = (user, res, message) => {
  const token = Jwt.sign({ id: user._id }, config.JWT_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token)
  res.status(200).json({
    message,
    success:true,
    user: {
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role,
    },
  });
};

export const RegisterController = async (req, res) => {
  try {
    const { email, contact, password, fullname, role } = req.body;

    const exists = await userModel.findOne({ $or: [{ email }, { contact }] });
    if (exists)
      return res
        .status(400)
        .json({ message: "User with this email or contact already exists" });

    await userModel.create({
      fullname,
      email,
      password,
      contact,
      role,
      verified: false,
    });

    const token = generateVerificationToken(email);
    await sendVerificationEmail(email, fullname, token);

    return res
      .status(201)
      .json({ message: "Check your email to verify your account." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const VerifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = verifyVerificationToken(token);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(400).json({ message: "Invalid link" });
    if (user.verified)
      return res.status(400).json({ message: "Already verified" });

    user.verified = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    const msg =
      err.name === "TokenExpiredError" ? "Link expired" : "Invalid link";
    return res.status(400).json({ message: msg });
  }
};
