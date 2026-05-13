const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

require("./db/connection");

const authController = require("./controllers/auth");
const usersController = require("./controllers/users");
const postsController = require("./controllers/posts");
const commentsController = require("./controllers/comments");

const corsOptions = {
  origin: "https://journal-pigeon.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(logger("dev"));

app.get("/favicon.ico", (req, res) => res.status(204));

app.use("/auth", authController);
app.use("/users", usersController);
app.use("/posts/:postId/comments", commentsController);
app.use("/posts", postsController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Microphone Check One Two What Is This on port ${PORT}`);
});
