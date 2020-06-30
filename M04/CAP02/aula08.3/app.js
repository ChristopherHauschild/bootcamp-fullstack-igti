import mongoose from 'mongoose'
import express from 'express'

import { studentRouter } from './routes/studentRouter.js'

// require('dotenv').config()

// Conexão ao MongoDB através do mongoose
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PSWDB}@igti-b6daz.mongodb.net/grades?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  } catch (err) {
    console.log('Erro ao conectar com o MongoDB' + err)
  }
})()

const app = express()

app.use(express.json())
app.use(studentRouter)

app.listen(3000, () => console.log('API Iniciada com Sucesso...'))