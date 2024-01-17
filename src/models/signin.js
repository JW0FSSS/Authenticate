import { User } from '../schemas/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function Usermodel ({ password, email }) {
  try {
    const user = await User.findOne({ where: { email } })

    if (!user || user == null) return { email, error: 'Usuario o contraseña incorrecta' }
    const verify = await bcrypt.compare(password, user.password)

    if (!verify) return { email, error: 'Usuario o contraseña incorrecta' }
    const token = await jwt.sign({ id: user.id }, 'hola', { algorithm: 'HS256', expiresIn: '10h' })
    return { token }
  } catch (error) {
    return new Error(`error : ${error}`)
  }
}

export async function Profilemodel (id) {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) return { error: 'Usuario no encontrado' }
    return { user }
  } catch (error) {
    return new Error(`error : ${error}`)
  }
}

export async function EmailModel ({ id, newEmail }) {
  try {
    const user = await User.findByPk(id)
    if (!user) return { id, error: 'Usuario no encontrado' }

    user.email = newEmail
    await user.save()
    return { message: 'update succesfuly' }
  } catch (error) {
    return { error: 'Usuario no encontrado' }
  }
}

export async function PasswordModel ({ id, newPassword, oldPassword }) {
  try {
    console.log(newPassword)
    console.log(oldPassword)
    const user = await User.findByPk(id)

    if (!user) return { id, error: 'Usuario no encontrado' }

    const verify = await bcrypt.compare(oldPassword, user.password)

    if (!verify) return { id, error: 'Contraseña incorrecta' }
    const newpassword = await bcrypt.hash(newPassword, 10)
    user.password = newpassword
    await user.save()
    return user
  } catch (error) {
    return { error: 'Usuario no encontrado' }
  }
}
export async function NameModel ({ id, newName }) {
  try {
    const user = await User.findByPk(id)
    if (!user) return { id, error: 'Usuario no encontrado' }

    user.username = newName
    await user.save()
    return user
  } catch (error) {
    return { error: 'Usuario no encontrado' }
  }
}

export async function DeleteModel ({ id, password }) {
  try {
    const user = await User.findByPk(id)
    if (!user) return { id, error: 'Usuario no encontrado' }

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) return { id, error: 'Contraseña incorrecta' }

    await user.destroy()
    return { message: 'usuario eliminado' }
  } catch (error) {
    return { error: 'Usuario no encontrado' }
  }
}
