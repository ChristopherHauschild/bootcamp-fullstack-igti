import express from "express"
import { promises } from "fs"

const router = express.Router()

const readFile = promises.readFile
const writeFile = promises.writeFile

// ======= APENAS TESTE =========

router.get("/states", async (_, res) => {
  try {
    const data = await readFile(global.states, "utf8")

    const json = JSON.parse(data)

    res.send(json)
    console.log('GET / estados com sucesso')
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

router.get("/cities", async (_, res) => {
  try {
    const data = await readFile(global.cities, "utf8")

    const json = JSON.parse(data)

    res.send(json)
    console.log('GET / cidades com sucesso')
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// ===============================

router.get("/", async (_, res) => {
  try {
    const dataStates = await readFile(global.states, "utf8")
    const dataCities = await readFile(global.cities, "utf8")
    
    const listStates = JSON.parse(dataStates.toString())
    const listCities = JSON.parse(dataCities.toString())

    listStates.forEach(state => {
      saveStateFile(state, listCities);
    })

  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

const saveStateFile = (state, listCities) => {
  const citiesIn = listCities.filter(city => city.Estado === state.ID);

  writeFile(`./states/${state.Sigla}.json`, JSON.stringify(citiesIn, null, 4), (err) => {
    if (err) {
      console.log(`Erro no arquivo ${state.Sigla}.json.`, err);
      return
    }

    console.log(`${state.Sigla}.json salvo com sucesso.`);
  })
}


router.get("/states-with-more-cities", async (_, res) => {
  try {
    const dataStates = await readFile(global.states, "utf8")
    const listStates = JSON.parse(dataStates.toString())

    const countCities = listStates.map(state => ({
      uf: state.Sigla
    }))

    countCities.forEach(async state => {
      const dataCities = await readFile(`./states/${state.uf}.json`, "utf8")
      const listCities = JSON.parse(dataCities.toString())

      return (
        console.log(listCities)
      )
    })

    res.end()
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

// ============== NÚMERO DE CIDADES POR ESTADO ================

router.get("/:uf", async (req, res) => {
  try {
    let ufSelected = req.params.uf

    const dataStates = await readFile(`./states/${ufSelected}.json`, "utf8")

    const listCitiesInState = JSON.parse(dataStates.toString())

    let counter = listCitiesInState.length

    res.send(`${ufSelected} possui ${counter} cidades`)

  } catch (err) {
    res.status(400).send({ error: err.message })
  }

})

export default router
