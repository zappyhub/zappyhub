import express from "express";
import userRouter from "@/routes/userRouter";

export const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  return res.send({ Message: "Server up! Happy hacking 🚀" });
});

app.use("/api/users", userRouter);
