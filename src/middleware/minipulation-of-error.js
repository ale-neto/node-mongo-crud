import mongoose from "mongoose";
import RequestIncorret from "../errors/RequestIncorret.js";
import ValidationError from "../errors/ValidationError.js";
import ErrorBase from "../errors/ErrorBase.js";

function manipulationOfError(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new RequestIncorret().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof ErrorBase) {
    err.sendResponse(res);
  } else {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

export default manipulationOfError;
