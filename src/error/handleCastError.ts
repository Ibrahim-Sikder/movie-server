/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TErrourSources } from "../interface/error.interface";

 const handleCastError = (err:mongoose.Error.CastError)=>{

    const errorSources:TErrourSources= [
        {
            path: err.path,
            message: err.message
        }
    ]

    const statusCode = 400;

    return {
      statusCode,
      message: "Cast Error",
      errorSources,
    };
}



export default handleCastError