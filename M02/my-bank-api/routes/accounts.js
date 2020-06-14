import express from "express"
import { promises } from "fs"

const router = express.Router()

const readFile = promises.readFile
const writeFile = promises.writeFile

// '/' pois concatena ao /account definido em index
router.post("/", async (req, res) => {
  let account = req.body

  try {
    let data = await readFile(global.fileName, "utf8")
    let json = JSON.parse(data)

    account = { id: json.nextId++, ...account }
    json.accounts.push(account) // adicionando objeto account no final do array accounts

    await writeFile(global.fileName, JSON.stringify(json))

    res.end()

    logger.info(`POST /account - ${JSON.stringify(account)}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`POST /account - ${err.message}`)
  }

})


// ======= GET ========

router.get("/", async (_, res) => {
  try {
    let data = await readFile(global.fileName, "utf8")

    let json = JSON.parse(data)
    delete json.nextId

    res.send(json)
    logger.info('GET /')
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET / - ${err.message}`)
  }

})

// '/:id' pois concatena ao /account definido em index
router.get("/:id", async (req, res) => {
  try {
    let data = await readFile(global.fileName, "utf8")
    let json = JSON.parse(data)
    const account = json.accounts.find(account => account.id === parseInt(req.params.id, 10))

    if (account) {
      res.send(account)
      logger.info(`GET /:id - ${account}`)
    } else {
      res.end()
      logger.info('GET /:id')
    }
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET /:id - ${err.message}`)
  }

})


// ====== DELETE =======

router.delete("/:id", async (req, res) => {
  try {
    let idParams = req.params.id
    let data = await readFile(global.fileName, "utf8")

    let json = JSON.parse(data)

    let account = json.accounts.filter(account => account.id !== parseInt(idParams, 10))
    json.accounts = account // array sem o id removido

    await writeFile(global.fileName, JSON.stringify(json))
    res.end()
    logger.info(`DELETE /:id - ${idParams}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`DELETE /:id - ${err.message}`)
  }

})


router.put("/", async (req, res) => {
  try {
    let newAccount = req.body
    let data = await readFile(global.fileName, "utf8")

    let json = JSON.parse(data)
    let oldIndex = json.accounts.findIndex(account => account.id === newAccount.id)

    json.accounts[oldIndex].name = newAccount.name
    json.accounts[oldIndex].balance = newAccount.balance

    await writeFile(global.fileName, JSON.stringify(json))
    res.end()
    logger.info('PUT /')
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET /:id - ${err.message}`)
  }

})

router.post("/transaction", async (req, res) => {
  try {
    let params = req.body

    let data = await readFile(global.fileName, "utf8")

    let json = JSON.parse(data)
    let index = json.accounts.findIndex(account => account.id === params.id)

    if ((params.value < 0) && ((json.accounts[index].balance + params.value) < 0)) {
      throw new Error("Saldo insuficiente")
    }

    json.accounts[index].balance += params.value

    await writeFile(global.fileName, JSON.stringify(json))
    res.send(json.accounts[index])

    logger.info(`POST /transaction - ${params}`)
  } catch (err) {
    res.status(400).send({ error: err.message })
    logger.error(`GET /:id - ${err.message}`)
  }

})

export default router
