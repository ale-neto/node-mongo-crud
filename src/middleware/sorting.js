function sorting(req, res, next) {
  const { sort = "name", order = "asc" } = req.query;

  const sortOrder = order === "desc" ? -1 : 1;

  req.sorting = {
    [sort]: sortOrder,
  };

  next();
}

export default sorting;
