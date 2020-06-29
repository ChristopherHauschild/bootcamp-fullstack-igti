import express from 'express'

import { studentModel } from '../models/student.js'

const app = express()

app.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find()
    res.send(student)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/student', async (req, res) => {
  try {
    // Schema realiza verficações/validações necessárias
    const student = new studentModel(req.body)
    await student.save()

    res.send(student)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/student/:id', async(req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({ _id: req.params.id})
  
    if (!student) {
      res.statusMessage(404).send('Doc não encontrado.')
    }

    res.status(200).send('Doc removido com sucesso...')
  } catch (err) {
    res.status(500).send(err)
  }
})

app.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
  
    if (!student) {
      res.statusMessage(404).send('Doc não encontrado.')
    }

    res.send(student)
  } catch (err) {
    res.status(500).send(err)
  }
})

export { app as studentRouter }