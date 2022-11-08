import { ApiError } from 'next/dist/server/api-utils';

export function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiError ? exception.statusCode : 500;
}

export function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`;
}

export function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined;
}

function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}
