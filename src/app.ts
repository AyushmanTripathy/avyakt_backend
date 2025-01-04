import express from "express";
import path from 'path';
import apiRouter from "./api/routes/route";
import adminRouter from "./admin/routes/route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'admin', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use("/admin", adminRouter)
app.use("/api", apiRouter);

export default app;