import express from "express";
import apiRouter from "./routes/api";
import adminRouter from "./routes/admin";
import { join } from "path";
import expressLayouts from "express-ejs-layouts";

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts)
app.use("/static", express.static(join(__dirname, '../static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

export default app;
