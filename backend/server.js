import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

import express from "express";
import passport from "passport";
import cors from "cors";
// import passport from "./config/passport.js";
import corsOptions from "./config/corsOptions.js";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import notFound from "./middleware/notFoundMiddleware.js";
import errorHandler from "./middleware/errorMiddleware.js";

import "./config/passport.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5300;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});