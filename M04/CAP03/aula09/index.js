/*
  Definir se variável sera carregada
  via linha de comando ou via código
*/

if(process.env.PRD !== "true") require('dotenv').config()

console.log(process.env.USERDB)