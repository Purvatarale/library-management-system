import express from "express";
import { config } from "dotenv";
import a from "@rsxt/debugger";
import cors from "cors";
import { connectToDb } from "./config/db.js";
import userRouter from "./route/user.route.js";

const app = express();
config();

app.use(express.json());

app.use(cors());

connectToDb();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcom to the Library" });
});

app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  a.logger.info(`Server listening on port: ${process.env.PORT}`);
});
