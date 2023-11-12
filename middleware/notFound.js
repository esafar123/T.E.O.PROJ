exports.notFound = (req, res, next) => {
  res.status(404).json("Path not found!");
};
