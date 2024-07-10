/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrourSources } from "../interface/error.interface";


const handleDuplicateError = (err:any)=>{
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources:TErrourSources = [
        {
            path: '',
            message: `${extractedMessage} already exists!`
        }
    ]

    return {
        errorSources
    }

}

export default handleDuplicateError;