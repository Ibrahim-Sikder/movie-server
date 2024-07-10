import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";


const register = catchAsync(async(req, res)=>{
    const result = await authServices.register(req.body);

    res.status(200).json({
        success:true,
        message:'User register successfully',
        data:result,
    })
})
const login = catchAsync(async(req, res)=>{

    const {accessToken, refreshToken} = await authServices.login(req.body);
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        secure:config.NODE_ENV === 'production'
    })
    res.status(200).json({
        success:true,
        message:'User login successfully',
        data:accessToken,
    })
})

export const authController = {
    register,
    login
}