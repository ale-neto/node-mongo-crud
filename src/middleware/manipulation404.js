import NotFound from "../errors/NotFound.js";

function manipulation404(req, res, next) {
  const error = new NotFound(`Cannot ${req.method} ${req.originalUrl}`);
  next(error);
}

export default manipulation404;
