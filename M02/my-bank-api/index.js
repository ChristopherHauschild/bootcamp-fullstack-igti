import express from "express"
import winston from "winston"
import { promises } from "fs"
import cors from "cors"

import accountsRouter from "./routes/accounts"
const app = express()

const readFile = promises.readFile
const writeFile = promises.writeFile

app.use(express.json())
app.use(cors())
app.use("/account", accountsRouter) // quando chegar alguma req em account, utiliza o accounRouter

global.fileName = "accounts.json"

const { combine, timestamp, label, printf} = winston.format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat
  )
})

app.listen(3000, async () => {
  try {
    await readFile(global.fileName, "utf8")
    logger.info("API Started")

  } catch (err) {
    // SE NÃO LER CORRETAMENTE, CRIA ARQUIVO
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile(global.fileName, JSON.stringify(initialJson)).catch(err => {
      logger.error(err)
    })
  }
})