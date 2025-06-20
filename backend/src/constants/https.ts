 export const OK=200;
 export const Created = 201;
 export const BadRequest = 400;
 export const Unauthorized = 401;
 export const Forbidden = 403;
 export const NotFound = 404;
 export const InternalServerError = 500;
 export const NotImplemented = 501;
 export const ServiceUnavailable = 503;
 export const Conflict = 409;
 export const UnprocessableEntity = 422;
 export const TooManyRequests = 429;

 export type HttpsStatusCode = 
    | typeof OK 
    | typeof Created
    | typeof BadRequest
    | typeof Unauthorized
    | typeof Forbidden
    | typeof NotFound
    | typeof InternalServerError
    | typeof NotImplemented
    | typeof ServiceUnavailable
    | typeof Conflict
    | typeof UnprocessableEntity
    | typeof TooManyRequests;
    
 