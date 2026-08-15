import userModel from "../models/user.model.js";
import config from "../config/config.js";
import { generateVerificationToken } from "../utils/jwt.utils.js";
import sendVerificationEmail from "../services/email.service.js";

const sendTokenResponse = (user, res) => {
  const Token = Jwt.sign({ id: user._id }, config.JWT_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({
    Token,
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

    const exists = await UserModel.findOne({ $or: [{ email }, { contact }] });
    if (exists)
      return res
        .status(400)
        .json({ message: "User with this email and contact alreat exists" });

    await UserModel.create({ name, email, password, verified: false });

    const token = generateVerificationToken(email);
    await sendVerificaticdonEmail(email, name, token);

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
    const { token } = req.params;
    const decoded = verifyVerificationToken(token);

    const user = await UserModel.findOne({ email: decoded.email });
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
