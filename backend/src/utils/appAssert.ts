import assert from "node:assert"
import AppError from "./appError.js"
import { HttpsStatusCode } from "../constants/https.js"
import AppErrorCode from "../constants/appErrorCode.js"
type AppAssert = (
    condition: any,
    HttpsStatusCode: HttpsStatusCode,
    message: string,
     appErrorCode?: AppErrorCode

)=> asserts condition;

const appAssert: AppAssert = (
    condition: any,
    HttpsStatusCode,
    message,
    appErrorCode
)=>{
    const appAssert: AppAssert = (
        condition: any,
        statusCode,
        message,
        appErrorCode
      ) => {
        if (!condition) {
          throw new AppError(statusCode, message, appErrorCode);
        }
      };
      
}

export default appAssert