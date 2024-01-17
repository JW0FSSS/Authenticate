import jwt from 'jsonwebtoken'

export async function Jwtverify (req, res, next) {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    const payload = await jwt.verify(token, process.env.KEY)
    const { id } = payload
    req.jwt = id
    next()
  } catch (error) {
    throw new Error('token invalido')
  }
}
