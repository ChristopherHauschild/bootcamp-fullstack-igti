import mongoose from 'mongoose'
import express from 'express'

import { studentRouter } from './routes/studentRouter.js'

// Conexão ao MongoDB através do mongoose
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://chris_:7105@igti-b6daz.mongodb.net/grades?retryWrites=true&w=majority',
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