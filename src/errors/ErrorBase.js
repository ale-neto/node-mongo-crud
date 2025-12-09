class ErrorBase extends Error {
  constructor(message = "Error inInternal Server Error", statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  sendResponse(res) {
    res.status(this.statusCode || 500).json({
      error: this.message,
    });
  }
}
export default ErrorBase;
