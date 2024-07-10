


import express from 'express'
import { userController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from './user.validation'

import { USER_ROLE } from './user.constant'
import { auth } from '../../middleware/auth'

const router = express.Router()

router.post('/create-admin',validateRequest(UserValidations.createAdminValidations), auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), userController.createAdmin)
router.put('/:userId',validateRequest(UserValidations.updateUserValidations), userController.updateAdmin)


export const UserRoutes = router;