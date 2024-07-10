import { USER_Role } from "../../../Apollo-Flix-Query_Handling/src/modules/user/user.constants";
import { USER_STATUS } from "./user.constant";


export type TUser = {
  name: string;
  role: keyof typeof USER_Role;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
};

