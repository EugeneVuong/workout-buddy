const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../utils/config");

const verifyJWT = (request, response, next) => {
  const authHeader =
    request.header("Authorization") || request.header("authorization");

  if (!authHeader?.startsWith("Bearer ")) return response.status(403).end();

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    request.user = decoded.userID;
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = verifyJWT;
