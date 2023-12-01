import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/Users.js";
import teamRoutes from "./routes/Teams.js";
import dummyData from "./DummyData.js";
import Users from "./models/Users.js";

const app = express();

app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(morgan("tiny"));
dotenv.config();

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Connected to ${process.env.PORT}`);
});

// Users.insertMany(dummyData)
//   .then((result) => {
//     console.log(`${result.length} documents inserted successfully`);
//   })
//   .catch((error) => {
//     console.error("Error inserting dummy data:", error);
//   })
//   .finally(() => {
//     mongoose.disconnect(); // Close the connection after insertion
//   });
