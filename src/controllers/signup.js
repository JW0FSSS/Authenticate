import { SignUp } from '../models/signup.js'

export async function SignUpController (req, res) {
  try {
    const { email, password, name } = req.body
    const user = await SignUp({ email, password, name })

    return res.json({ user })
  } catch (error) {
    return new Error(`error : ${error}`)
  }
}
