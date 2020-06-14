import express from 'express'

const app = express()
const router = express.Router()

router.get('/abc', (req, res) => {
  console.log('/test')
  res.end()
})

app.use('/test', router)

app.listen(3000, async () => {
  console.log('API started!')
})