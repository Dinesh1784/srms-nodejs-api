module.exports = (err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.name,
    message: err.message,
  });
  next();
};
