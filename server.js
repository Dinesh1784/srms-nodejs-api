require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const createError = require("http-errors");
const cors = require("cors");
const connectToDb = require("./utils/db");
const commomRouter = require("./routes/commonRoutes");
const adminRoute = require("./routes/adminRoutes");
const resultRoute = require("./routes/resultRoutes");
const errorHandler = require("./controller/errorController");
const app = express();

//middleware
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "WELCOME TO SRMS",
  });
});
app.use("/api/v1", commomRouter);
app.use("/api/v1", adminRoute);
app.use("/api/v1", resultRoute);

//database
connectToDb();

//error handler
app.all("*", (req, res, next) => {
  next(createError(404, "Requested route is invalid!"));
});

//global error handler
app.use(errorHandler);

// listeining to server
app.listen(process.env.PORT || 5000, () => {
  console.log(`SRMS SERVER IS RUNNING AT http://localhost:${process.env.PORT}`);
});
