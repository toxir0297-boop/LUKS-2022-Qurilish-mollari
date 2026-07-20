import productsRouter from "./routes/products.js";
import { createTables } from "./models/tables.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.get("/", (req, res) => {
    res.send("LUKS Backend ishlayapti 🚀");
});

const PORT = 5000;

await createTables();

app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishlayapti`);
});