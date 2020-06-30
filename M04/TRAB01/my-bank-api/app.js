import mongoose from 'mongoose'
import express from 'express'

import { accountsRouter } from './routes/accountsRouter.js'

require('dotenv').config()
// Conexão ao MongoDB através do mongoose
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PSWDB}@igti-b6daz.mongodb.net/my-bank-api?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
  } catch (err) {
    console.log('Erro ao conectar com o MongoDB' + err)
  }
})()

const app = express()

app.use(express.json())
app.use(accountsRouter)

app.listen(3000, () => console.log('API Iniciada com Sucesso...'))