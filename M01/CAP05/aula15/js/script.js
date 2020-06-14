'use strict'

window.addEventListener('load', () => {
  console.log('Hello World!')

  const timer = document.querySelector('#timer')
  
  let count = 0
  const interval = setInterval(() => {
    timer.textContent = ++count

    if (count === 10) {
      this.clearInterval(interval)
      return
    }

    // posterga para executar função quando count for divisível por 5
    if (count % 5 === 0) { 
      setTimeout(() => {
        timer.textContent = count + ',5'
      }, 500)
    }
  }, 1000)
})