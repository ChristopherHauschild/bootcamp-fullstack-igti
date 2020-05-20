var title = document.querySelector('h1')
title.textContent = 'Titulo Alterado'

var info = document.querySelector('#info')
info.textContent = 'Informação alterada 03'

var personalData = document.querySelectorAll('.personal-data')
personalData = Array.from(personalData)

var data = Array.from(document.querySelectorAll('.data'))

for(var i = 0; i < data.length; i++) {
  var currentElement = data[i]
  currentElement.classList.add('emphasis')
}