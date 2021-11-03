const Admin = require("../models/admin");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.register = async (req, res, next) => {
  try {
    const admin = await Admin.create(req.body);
    if (!admin) {
      return next(createError(500, "something went worng"));
    }
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    return next(createError(400, error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return next(createError(404, "No admin found on that username"));
    }
    const doCheck = await admin.checkPassword(password);
    if (!doCheck) {
      return next(createError(400, "Password is wrong"));
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        AdminUsername: admin.username,
        isAdmin: admin.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      }
    );

    res.status(200).json({
      status: "success",
      admin: admin.username,
      token: token,
    });
  } catch (error) {
    return next(createError(400, error));
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      createError(401, "You are not logged in! Please log in to get access.")
    );
  }
  console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await Admin.findById(decoded.adminId);
  if (!currentUser) {
    return next(
      createError(401, "The user belonging to this token does no longer exist.")
    );
  }
  req.user = currentUser;
  next();
};
