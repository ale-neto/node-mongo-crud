import RequestIncorret from "./RequestIncorret.js";

class ValidationError extends RequestIncorret {
  constructor(err) {
    res
      .status(400)
      .send({ message: `The following errors were found: ${err.message}` });

    super();
  }
}

export default ValidationError;
