class AppError extends Error {
    statusCode;
    message;
    errorCode;
    constructor(statusCode, message, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errorCode = errorCode;
    }
}
export default AppError;
