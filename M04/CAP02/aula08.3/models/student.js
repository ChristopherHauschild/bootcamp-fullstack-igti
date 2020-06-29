import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  subject : {
    type: String,
    required: true
  },
  type : {
    type: String,
    required: true
  },
  value : {
    type: Number,
    required: true,
    validate(value) {
      if(value < 0) throw new Error('Valor negativo para nota não é permitido')
    }
  },
  lastModified : {
    type: Date,
    default: Date.now
  }
})

// Definindo modelo que a colecao student ira assumir
// 3° param -> forçar para que não crie collection no plural
const studentModel = mongoose.model('student', studentSchema, 'student')

export { studentModel }