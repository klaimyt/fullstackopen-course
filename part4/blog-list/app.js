const express = require("express");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");

logger.info("Connecting to DB...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("DB Connected!"))
  .catch((err) => logger.error("DB Connection error!: ", err));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app
