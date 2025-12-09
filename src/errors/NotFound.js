import ErrorBase from "./ErrorBase.js";

class NotFound extends ErrorBase {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}
export default NotFound;
