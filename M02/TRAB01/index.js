import express from 'express'
import { promises } from 'fs'

import citiesAndStatesRouters from "./routes/cities-and-states.js"

const app = express()

app.use("/cities-and-states", citiesAndStatesRouters)

const readFile = promises.readFile

global.states = "Estados.json"
global.cities = "Cidades.json"

app.listen(3003, async () => {
  try {
    await readFile(global.states, "utf8")
    await readFile(global.cities, "utf8")

    console.log("API Started")
  } catch (err) {
    console.log('Erro na requisição: ', err)
  }
})