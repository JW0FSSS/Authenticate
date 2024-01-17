import { Router } from 'express'
import { SignUpController } from '../controllers/signup.js'

export const SignUp = Router()

SignUp.post('/', SignUpController)
