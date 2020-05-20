// Quando página carrega totalmente, executa função start 
// Apenas referenciada nesta declaração
window.addEventListener('load', start)

function start() {
  console.log('HelloWorld')
  console.log('Página totalmente carregada')
  

  var nameInput = document.querySelector('#nameInput')
  nameInput.addEventListener('keyup', countName) 
  // Chama função countName ao ocorrer evento em nameInput

  var form = document.querySelector('form')
  form.addEventListener('submit', preventSubmit)
  // Chama função preventSubmit ao ocorrer evento em form
}

function countName(event) { // Acionado quando input recebe evento
  var count = event.target.value

  var span = document.querySelector('#nameLength')
  span.textContent = 'Contador de Caracteres: ' + count.length
}

function preventSubmit(event) { // Acionado quando ocorre submit no form
  event.preventDefault()

  var nameInput = document.querySelector('#nameInput')
  alert(nameInput.value + ' cadastrado com sucesso!')
}
