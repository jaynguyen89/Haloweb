import { HttpStatusCode } from 'axios';

export const isSuccessStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.Ok && statusCode <= HttpStatusCode.MultiStatus;

export const isClientErrorStatusCode = (statusCode: number | HttpStatusCode) =>
    statusCode >= HttpStatusCode.BadRequest && statusCode < HttpStatusCode.InternalServerError;

export const isServerErrorStatusCode = (statusCode: number | HttpStatusCode) => statusCode >= HttpStatusCode.InternalServerError;
