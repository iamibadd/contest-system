const express = require("express");
const cors = require("cors");
const httpStatus = require("./utils/httpStatus");
const morgan = require("morgan");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { schedulePrizeDistribution } = require("./workers/prizeDistribution");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(morgan("tiny"));

app.use("/", routes);

app.use("/health", (req, res) => res.send("Server is healthy!!"));

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

schedulePrizeDistribution();

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
