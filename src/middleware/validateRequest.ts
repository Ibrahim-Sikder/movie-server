/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../utils/catchAsync';

const router = express.Router();


// const validateRequest = (schema: AnyZodObject) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await schema.parseAsync(req.body)
//             next()
//         } catch (err) {
//           next(err)
//         }

//     }
// }

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const parsedBody = await schema.parseAsync({
        body: req.body,
      });
  
      req.body = parsedBody.body;
  
      next();
    });
  };
export default validateRequest