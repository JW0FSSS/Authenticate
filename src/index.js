import express from 'express'
import './config/enviroment.js'
import { connection } from './config/db.js'
import { SignIn } from './routes/signin.js'
import { SignUp } from './routes/signup.js'

const app = express()

app.use(express.json())

app.use('/account', SignIn)
app.use('/signUp', SignUp)

app.use((req, res) => {
  res.send('error 404')
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

async function server () {
  try {
    await connection.authenticate()
    console.log('Database turn on...')
    app.listen(process.env.PORT, () => console.log(`server on.. http://localhost:${process.env.PORT}`))
  } catch (error) {
    throw new Error(`error ${error}`)
  }
}

server()
