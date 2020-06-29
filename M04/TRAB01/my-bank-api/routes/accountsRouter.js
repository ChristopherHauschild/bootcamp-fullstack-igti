import express from 'express'

import { accountsModel } from '../models/accounts.js'

const app = express()

// TESTES

app.get('/accounts', async (req, res) => {
  try {
    const accounts = await accountsModel.find()
    res.send(accounts)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/accounts', async (req, res) => {
  try {
    // Schema realiza verficações/validações necessárias
    const accounts = new accountsModel(req.body)
    await accounts.save()

    res.send(accounts)
  } catch (err) {
    res.status(500).send(err)
  }
})

// TRANSAÇÃO

app.put('/accounts/transaction', async (req, res) => {
  try {
    let params = req.body

    const accounts = await accountsModel
      .findOneAndUpdate({ agencia: params.agencia, conta: params.conta }, { $inc: { balance: params.value }} , { new: true })

    if (!accounts) {
      res.statusMessage(404).send('Conta não encontrada.')
    }

    const newBalance = accounts.balance

    res.send(`New balance: ${newBalance}`)
  } catch (err) {
    res.status(500).send(err)
  }
})

// SAQUE

app.put('/accounts/withdraw', async (req, res) => {
  try {
    let params = req.body
    let taxa = params.value + 1

    let accounts = await accountsModel
      .findOneAndUpdate({ agencia: params.agencia, conta: params.conta }, { $inc: { balance: taxa }} , { new: true })
    
    if (!accounts) {
      res.status(404).send('Conta não encontrada.')
    }

    if ((accounts.balance - params.value) < 0) {
      res.status(404).send('Saldo insuficiente.')
      accounts = await accountsModel
      .findOneAndUpdate({ agencia: params.agencia, conta: params.conta }, { $inc: { balance: - taxa }} , { new: true })
    }

    const newBalance = accounts.balance

    res.send(`New balance: ${newBalance}`)
  } catch (err) {
    res.status(500).send(err)
  }
})

// CONSULTAR SALDO

app.get('/accounts/:agencia/:conta', async (req, res) => {
  try {
    let params = req.params

    const accounts = await accountsModel
      .findOne({ agencia: params.agencia, conta: params.conta })

    if (!accounts) {
      res.statusMessage(404).send('Conta não encontrada.')
    }

    const balanceFinded = accounts.balance

    res.send(`Balance: ${balanceFinded}`)
  } catch (err) {
    res.status(500).send(err)
  }
})

// EXCLUIR E CONSULTAR NUMERO DE CONTAS POR AGENCIA

app.delete('/accounts/:agencia/:conta', async (req, res) => {
  try {
    let params = req.params

    const accountToDelete = await accountsModel
      .findOneAndDelete({ agencia: params.agencia, conta: params.conta })
    
    const accounts = await accountsModel
      .find({ agencia: params.agencia })

    if (!accounts) {
      res.statusMessage(404).send('Conta não encontrada.')
    }

    const numbersOfAccounts = Object.values(accounts).length
    res.send(`Numbers of accounts: ${numbersOfAccounts}`)
  } catch (err) {
    res.status(500).send(err)
  }
})

// TRANSFERENCIA ENTRE CONTAS

app.patch('/accounts/transferency', async (req, res) => {
  try {
    let params = req.body

    const accountOrigin = await accountsModel
      .findOne({ conta: params.origin }, { _id: 0, agencia: 1 })

    const accountDestiny = await accountsModel
      .findOne({ conta: params.destiny }, { _id: 0, agencia: 1 })

    if (!accountOrigin) {
      res.status(404).send('Conta de origem não encontrada.')
    } else if (!accountDestiny) {
      res.status(404).send('Conta de destino não encontrada.')
    } else {
      if (accountOrigin.agencia === accountDestiny.agencia) {
        const newAccountOrigin = await accountsModel
          .findOneAndUpdate({ conta: params.origin }, { $inc: { balance: - params.value } })
        
        const newAccountDestiny = await accountsModel
          .findOneAndUpdate({ conta: params.destiny }, { $inc: { balance: params.value } })
        
        res.send(`New balance: ${(newAccountOrigin.balance) - params.value}`)
      } else if (accountOrigin.agencia !== accountDestiny.agencia){
        let taxa = params.value + 8

        const newAccountOrigin = await accountsModel
          .findOneAndUpdate({ conta: params.origin }, { $inc: { balance: - taxa} })
        
        const newAccountDestiny = await accountsModel
          .findOneAndUpdate({ conta: params.destiny }, { $inc: { balance: params.value } })
        
        res.send(`New balance: ${(newAccountOrigin.balance) - params.value}`)
      }
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

// MEDIA DE SALDO POR AGENCIA

app.get('/accounts/agency', async (req, res) => {
  try {
    let params = req.body

    const accounts = await accountsModel.aggregate([
      {$match: { agencia: params.agencia }},
      {$group: {_id: null, total: { $avg: "$balance"}}}
    ])

    res.send(accounts)
  } catch (err) {
    res.status(500).send(err)
  }
})

// MENORES VALORES

app.get('/accounts/less', async (req, res) => {
  try {
    let params = req.body

    let array = []

    const accounts = await accountsModel.find().sort({ balance: 1 })
    
    accounts.forEach((el) => {
      array.push(` Agência: ${el.agencia}, Conta: ${el.conta}, Saldo:${el.balance} `)
      return array
    })

    const finalArray = array.slice(0, params.value)

    console.log(finalArray)
    res.send('Operação realizada com sucesso! Você pode ver o resultado no console.')
  } catch (err) {
    res.status(500).send(err)
  }
})

// MAIORES VALORES

app.get('/accounts/more', async (req, res) => {
  try {
    let params = req.body

    let array = []

    const accounts = await accountsModel.find().sort({ balance: -1, name: 1 })
    
    accounts.forEach((el) => {
      array.push(` Agência: ${el.agencia}, Conta: ${el.conta}, Nome: ${el.name}, Saldo:${el.balance} `)
      return array
    })

    const finalArray = array.slice(0, params.value)

    console.log(finalArray)
    res.send('Operação realizada com sucesso! Você pode ver o resultado no console.')
  } catch (err) {
    res.status(500).send(err)
  }
})

// TRANFERIR CLIENTE DE AGÊNCIA

app.patch('/accounts/transfer-client', async (req, res) => {
  try {
  const accounts = await accountsModel.find();

  let bigValue = new Map();

  for (let i = 0; i < accounts.length; i++) {
    if (!bigValue.get(accounts[i].agencia)) {
      bigValue.set(accounts[i].agencia, accounts[i]);
    } else {
      if (bigValue.get(accounts[i].agencia).balance < accounts[i].balance) {
        bigValue.set(accounts[i].agencia, accounts[i]);
      }
    }
  }

  for (const acc of bigValue) {
    await accountsModel.findOneAndUpdate(
      { conta: acc[1].conta, agencia: acc[1].agencia },
      { agencia: 99 },
      { new: true }
    );
  }

  const accounts99 = await accountsModel.find({ agencia: 99 });

  console.log(accounts99)
  res.send('Ação concluída com sucesso! Você pode ver o resultado no console.');
  } catch (err) {
    res.status(500).send(err)
  }
})

export { app as accountsRouter }