import { User } from '../schemas/user.js'
import bcrypt from 'bcrypt'

export async function SignUp ({ password, email, name }) {
  try {
    const user = await User.findOne({ where: { email }, attributes: ['username', 'email'] })

    if (user) return { error: 'Usuario existente' }

    const newPassword = await bcrypt.hash(password, 10)
    const newuser = new User({
      username: name,
      password: newPassword,
      email
    })
    newuser.save()
    return newuser
  } catch (error) {
    throw new Error(`error: ${error}`)
  }
}
