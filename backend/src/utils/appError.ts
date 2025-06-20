import AppErrorCode from "../constants/appErrorCode.js";
import { HttpsStatusCode } from "../constants/https.js";

class AppError extends Error {
    constructor(
        public statusCode: HttpsStatusCode,
        public message: string,
        public errorCode?: AppErrorCode,
    ) {
        super(message)
    }
}

  
export default AppError;