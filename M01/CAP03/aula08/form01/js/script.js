// Quando página carrega totalmente, executa função start 
// Apenas referenciada nesta declaração
window.addEventListener('load', start)

function start() {
  console.log('HelloWorld')
  console.log('Página totalmente carregada')
  
  var textarea = document.querySelector('textarea')
  textarea.textContent = 'Valor inserido via JS' 

  var inputBtn = document.querySelector('#btn')
  inputBtn.addEventListener('click', buttonClick)
}

function buttonClick(event) {
  event.preventDefault()
  console.log('Clicou')
}


