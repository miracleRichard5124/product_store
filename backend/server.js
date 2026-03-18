import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
app.use("/api/products", productRoutes);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running properly!")
})

app.listen(5000, () => {
  connectDB();
  console.log("Server running on port 5000");
});

//PfwqdGvFhKuGMiFz
