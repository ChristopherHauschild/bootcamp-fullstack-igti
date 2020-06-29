import mongoose from 'mongoose'

const accountsSchema = mongoose.Schema({
  agencia : {
    type: Number,
    required: true
  },
  conta : {
    type: Number,
    required: true
  },
  name : {
    type: String,
    required: true
  },
  balance : {
    type: Number,
    required: true,
    validate(balance) {
      if (balance < 0) throw new Error('Valor de balance não pode ser negativo')
    }
  }
})

// Definindo modelo que a colecao accounts ira assumir
const accountsModel = mongoose.model('accounts', accountsSchema, 'accounts')

export { accountsModel }