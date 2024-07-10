/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound = (req:Request, res:Response, next:NextFunction)=>{
    return res.status(404).json({
      success:false,
      message:'API not found',
      error: ''
    })
  }