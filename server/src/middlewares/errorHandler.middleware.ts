import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { z, ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { AppError } from "../utils/app-error";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    success: false,
    message: "Validation failed!",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
): any => {
  console.log(`Error occured on Path: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      success: false,
      message: "Invalid Json format. Please check your request body!",
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({
        success: false,
        message: error.message,
        errorCode: error.errorCode,
      });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: error?.message || "Unknown error occured!",
  });
};
