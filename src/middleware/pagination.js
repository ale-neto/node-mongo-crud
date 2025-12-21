function pagination(req, res, next) {
  let { page = 1, limit = 10 } = req.query;

  page = Math.max(Number(page) || 1, 1);
  limit = Math.max(Number(limit) || 10, 1);

  const skip = (page - 1) * limit;

  req.pagination = {
    page,
    limit,
    skip,
  };

  next();
}

export default pagination;
