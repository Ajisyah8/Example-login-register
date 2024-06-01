import express from "express";
import dotenv from "dotenv";
import { connection } from "./Database/db.js";
import route from "./route/route.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(route);

app.listen(process.env.PORT, async() => {
    await connection();
    console.log(`http://localhost:${process.env.PORT}`);
})