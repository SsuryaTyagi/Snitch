import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());


app.get("/health", (req, res) => res.json({ status: "ok" }));

import authRoute from "./routes/auth.routes.js";

app.use("/auth", authRoute);

export default app;
