const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { MONGODB_URI } = require("../be/utils/config");
const errorHandler = require("./middlewares/errorHandler");
const verifyJWT = require("../be/middlewares/verifyJWT");
const app = express();

// Connect to Database
mongoose.set({ strictQuery: false });
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to Connect to MongoDB");
  });

// For Cross Origin Resource Sharing
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Middleware for JSON
app.use(express.json());

// Middleware for Cookie Parser
app.use(cookieParser());

// Routes
app.use(morgan("tiny"));
app.use("/api/auth", require("../be/routes/auth"));

// Protected Routes
app.use(verifyJWT);
app.use("/api/exercises", require("../be/routes/exercises"));

app.use(errorHandler);

module.exports = app;
