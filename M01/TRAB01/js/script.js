window.addEventListener('load', start)

var inputRed = null
var inputGreen = null
var inputBlue = null

function start() {
  inputRed = document.querySelector('#inputRed')
  inputRed.addEventListener('change', colorRedDiv)

  inputGreen = document.querySelector('#inputGreen')
  inputGreen.addEventListener('change', colorGreenDiv)

  inputBlue = document.querySelector('#inputBlue')
  inputBlue.addEventListener('change', colorBlueDiv)
  
}

function colorRedDiv(event) {
  var valueRed = document.querySelector('#valueRed') 
  valueRed.classList.add("inputActive")
  valueRed.value = event.target.value

  valueRed.addEventListener('change', setColors())
}

function colorGreenDiv(event) {
  var valueGreen = document.querySelector('#valueGreen') 
  valueGreen.classList.add("inputActive")
  valueGreen.value = event.target.value

  valueGreen.addEventListener('change', setColors())
}


function colorBlueDiv(event) {
  var valueBlue = document.querySelector('#valueBlue') 
  valueBlue.classList.add("inputActive")
  valueBlue.value = event.target.value

  valueBlue.addEventListener('change', setColors())
}

function setColors(R, G, B) {
  var R = valueRed.value
  var G = valueGreen.value
  var B = valueBlue.value

  var square = document.querySelector('.square')
  square.style.backgroundColor = `rgb(${R}, ${G}, ${B})`

  var h1 = document.querySelector('h1')
  h1.style.color = `rgb(${R}, ${G}, ${B})`

  var container = document.querySelector('.container')
  container.style.boxShadow = `1px 2px 2px 0px rgb(${R}, ${G}, ${B})`

}