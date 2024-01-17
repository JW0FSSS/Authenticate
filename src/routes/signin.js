import { Router } from 'express'
import { DeleteController, EmailController, NameController, PasswordController, ProfileController, SignInController } from '../controllers/signin.js'
import { Jwtverify } from '../middlewares/jwt.js'

export const SignIn = Router()

SignIn.post('/', SignInController)
SignIn.get('/profile', Jwtverify, ProfileController)
SignIn.patch('/email', Jwtverify, EmailController)
SignIn.patch('/password', Jwtverify, PasswordController)
SignIn.patch('/name', Jwtverify, NameController)
SignIn.delete('/delete', Jwtverify, DeleteController)
