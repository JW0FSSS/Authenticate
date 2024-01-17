import { DeleteModel, EmailModel, NameModel, PasswordModel, Profilemodel, Usermodel } from '../models/signin.js'

export async function SignInController (req, res) {
  try {
    const { data } = req.body
    const { token } = await Usermodel(data)
    res.json({ token })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}

export async function ProfileController (req, res) {
  try {
    const id = req.jwt
    const { user } = await Profilemodel(id)
    res.json({ user })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}

export async function EmailController (req, res) {
  try {
    const id = req.jwt
    const { newEmail } = req.body

    const { message } = await EmailModel({ id, newEmail })

    res.json({ message })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}

export async function PasswordController (req, res) {
  try {
    const id = req.jwt
    const { oldPassword, newPassword } = req.body

    const user = await PasswordModel({ id, newPassword, oldPassword })

    res.json({ user })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}

export async function NameController (req, res) {
  try {
    const id = req.jwt
    const { newName } = req.body

    const user = await NameModel({ id, newName })

    res.json({ user })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}

export async function DeleteController (req, res) {
  try {
    const id = req.jwt
    const { password } = req.body

    const user = await DeleteModel({ id, password })

    res.json({ user })
  } catch (error) {
    res.status(300).send('ERROR')
  }
}
