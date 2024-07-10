/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_Role } from "../../../Apollo-Flix-Query_Handling/src/modules/user/user.constants";
import { USER_STATUS } from "./user.constant";
import bcrypt from 'bcrypt'
import config from "../../config";


const userSchema = new Schema<TUser>({
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: Object.keys(USER_Role),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
  });


  userSchema.pre('save', async function(next){
    const user = this

    user.password = await bcrypt.hash(user.password, Number( config.bcrypt_salt_round))
    next()
  }) 
  userSchema.post('save', async function(doc,next){
      doc.password = ''
  }) 


  export const User = model<TUser>('User', userSchema)