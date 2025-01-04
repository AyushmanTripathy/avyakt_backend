import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { initConnection } from "./db";

const PORT = process.env.PORT;

initConnection();
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
