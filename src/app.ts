import express from "express";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

export default app;
