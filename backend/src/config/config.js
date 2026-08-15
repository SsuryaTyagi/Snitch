import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}
if (!process.env.JWT_TOKEN_SECRET) {
    throw new Error("JWT_TOKEN_SECRET in not defined in the environment variables")
}
if (!process.env.SMTP_PASS && ! process.env.SMTP_USER) {
    throw new Error("SMTP_PASS && SMTP_USER is not dfined")
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
};

export default config;
