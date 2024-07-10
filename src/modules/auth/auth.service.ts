/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../error/AppError";
import { USER_ROLE } from "../user/user.constant";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from 'jsonwebtoken'
import config from "../../config";
const register = async (payload: TUser): Promise<any> => {
    const user = await User.findOne({ email: payload.email })

    if (user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User already exists!')
    }

    //set user role 
    payload.role = USER_ROLE.USER
    // current user 
    const newUser = await User.create(payload);
    return newUser;

}


const login = async (payload: TLoginUser): Promise<any> => {
    const user = await User.findOne({ email: payload.email }).select("+password")

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found !')
    }

    if (user.status === 'BLOCKED') {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked !')
    }



    const passwordMatched = await isPasswordMatched(payload.password, user.password)

    if (!passwordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Password do not matched')
    }

    const jwtPayload = {
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
      });
    
      const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_secret as string,
        {
          expiresIn: config.jwt_refresh_expires_in,
        }
      );

return {
    accessToken,
    refreshToken,
}


}




export const authServices = {
    register,
    login
}