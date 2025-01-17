import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import productsRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());

// Body parser middlerware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middlerware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
