import ErrorBase from "./ErrorBase.js";

class RequestIncorret extends ErrorBase {
  constructor() {
    super((message = "Request Incorrect"), (statusCode = 400));
  }
}

export default RequestIncorret;
