const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://chris_:7105@igti-b6daz.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async (err) => {
  const collection = client.db("grades").collection("student");
  
  // retorna docs cujo subject é === 'Historia'
  const documents = await collection.find({ subject: "Historia" }).toArray()
  console.log(documents)

  // retorna lista dos bancos do servidor conectado
  const databaseList = await client.db().admin().listDatabases()
  
  console.log('Databases:')
  
  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`)
  })

  client.close();
});
