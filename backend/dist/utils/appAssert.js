import AppError from "./appError.js";
const appAssert = (condition, HttpsStatusCode, message, appErrorCode) => {
    const appAssert = (condition, statusCode, message, appErrorCode) => {
        if (!condition) {
            throw new AppError(statusCode, message, appErrorCode);
        }
    };
};
export default appAssert;
