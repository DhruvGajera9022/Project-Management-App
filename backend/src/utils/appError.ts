import { HttpStatusCodeType, HttpStatus } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/errorCode.enum";

export class AppError extends Error {
  public statusCode: HttpStatusCodeType;
  public errorCode?: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode: HttpStatusCodeType,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Internal server exception
export class InternalServerException extends AppError {
  constructor(
    message = "Internal Server Error",
    errorCode?: ErrorCodeEnumType
  ) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCodeEnum.INTERNAL_SERVER_ERROR
    );
  }
}

// Not found exception
export class NotFoundException extends AppError {
  constructor(message = "Resource not found", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      HttpStatus.NOT_FOUND,
      errorCode || ErrorCodeEnum.RESOURCE_NOT_FOUND
    );
  }
}

// Bad request exception
export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      HttpStatus.BAD_REQUEST,
      errorCode || ErrorCodeEnum.VALIDATION_ERROR
    );
  }
}

// Unauthorize exception
export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCodeEnumType) {
    super(
      message,
      HttpStatus.UNAUTHORIZED,
      errorCode || ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }
}
