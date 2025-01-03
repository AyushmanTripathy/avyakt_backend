import app from "./app";
import dotenv from "dotenv";



dotenv.config();


const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});