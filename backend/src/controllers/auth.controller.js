import userModel from "../models/user.model.js";

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
