import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";


const createAdmin = catchAsync(async(req, res)=>{
    const result = await UserServices.createAdminIntoDB(req.body);

    res.status(200).json({
        success:true,
        message:'Admin is create successfully',
        data:result,
    })
})

const updateAdmin = catchAsync(async(req, res)=>{
    const {userId} = req.params
    const result = await UserServices.updateAdminFromDB(userId, req.body);

    res.status(200).json({
        success:true,
        message:'User update successfully',
        data:result,
    })
})


export const userController = {
    createAdmin,
    updateAdmin
}