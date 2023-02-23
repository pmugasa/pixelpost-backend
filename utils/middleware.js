const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  next();
};

const unknownEndPoints = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "JsonWebTokkenError") {
    return res.status(401).send({ error: "Token is missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).send({ error: "Token expired" });
  }

  next(error);
};

module.exports = { requestLogger, unknownEndPoints, errorHandler };
