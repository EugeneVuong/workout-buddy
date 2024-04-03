const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  if (error.name == "CastError") {
    return response.status(401).json({ error: "Invalid ID" });
  } else if (error.name == "ValidationError") {
    return response.status(403).json({ error: "Invalid Format" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(403).json({ error: "Invalid Token" });
  }
  next();
};

module.exports = errorHandler;
