import { ErrorResponseHandle } from "../types";

const StatusCode = {
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    UNAUTHORIZED : 410,

}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    CONFLICT: 'Conflict error',
    UNAUTHORIZED: 'Unauthorized',
}


class ErrorResponse extends Error {
    status: number;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}


export class ConflictRequestError extends ErrorResponse {
    constructor(message =  ReasonStatusCode.CONFLICT , statusCode =  StatusCode.CONFLICT) {
        super(message , statusCode);
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message =  ReasonStatusCode.FORBIDDEN , statusCode =  StatusCode.NOT_FOUND) {
        super(message , statusCode);
    }
}

export class AuthFailureError extends ErrorResponse {
    constructor(message =  ReasonStatusCode.UNAUTHORIZED , statusCode =  StatusCode.UNAUTHORIZED) {
        super(message , statusCode);
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(message =  ReasonStatusCode.NOT_FOUND , statusCode =  StatusCode.NOT_FOUND) {
        super(message , statusCode);
    }
}

export class ForbiddenError extends ErrorResponse {
    constructor(message =  ReasonStatusCode.FORBIDDEN , statusCode =  StatusCode.FORBIDDEN) {
        super(message , statusCode);
    }
}