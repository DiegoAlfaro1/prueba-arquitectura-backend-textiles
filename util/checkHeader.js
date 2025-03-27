module.exports = (headerName, errorMessage = "Api key invalida") => {
  return (req, res, next) => {
    const headerValue = req.get(headerName);
    if (!headerValue) {
      return req.status(400).json({ message: errorMessage });
    }
    next();
  };
};
