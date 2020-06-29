import mongoose from 'mongoose'

// Conexão ao MongoDB através do mongoose
(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chris_:7105@igti-b6daz.mongodb.net/grades?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  } catch (err) {
    console.log('Erro ao conectar com o MongoDB' + err)
  }
})()

// Criando modelo de Schema
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
    required: true
  },
  lastModified : {
    type: Date,
    default: Date.now
  }
})

// Definindo modelo que a colecao student ira assumir
// 3° param -> forçar para que não crie collection no plural
mongoose.model('student', studentSchema, 'student')

// Criando objeto
const student = mongoose.model('student')

// Criando novo objeto na coleção student
new student({
  name: "Paulo Assis",
  subject: "Matematica",
  type: "Trabalho Pratico",
  value: 22
}).save()
  .then(() => console.log('Doc inserido com sucesso!'))
  .catch((err) => console.log('Erro ao inserir Doc', err))

