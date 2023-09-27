const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeaders) {
    const error = appError.create(
      "token is required",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = authHeaders.split(" ")[1];

  try {
    const currentUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
