/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { TErrourSources } from "../interface/error.interface";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import { ZodError } from "zod";
import handleZodeError from "../error/handleZodeError";
import AppError from "../error/AppError";

export const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {


    let statusCode = 500;
    let message = 'Something went to wrong';
    let errorSources: TErrourSources = [
        {
            path: '',
            message: 'Something went wrong!'
        }
    ]

    if (err instanceof ZodError) {
        const handleZodError = handleZodeError(err);
        statusCode = handleZodError.statusCode;
        message = handleZodError.message;
        errorSources = handleZodError.errorSources
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;


    }

    // if (err.name === 'ValidationError') {
    //     const simplified = handleValidationError(err)

    // } else if (err.name === 'CastError') {
    //     const simplified = handleCastError(err)
    //     errorSources = simplified.errorSources

    // } else if (err.name === 11000) {
    //     const simplified = handleDuplicateError(err)
    //     errorSources = simplified.errorSources
    // }




    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        err,
    })
}