const noCache = (req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
};

module.exports = noCache;
