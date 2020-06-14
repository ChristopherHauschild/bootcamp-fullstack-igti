window.addEventListener('load', start)

let clickArray = []

function start() {
  const button = document.querySelector('#clickButton')
  button.addEventListener('click', handleButtonClick)
}

function handleButtonClick() {
  const item = getNewTimestamp()
  clickArray.push(item)

  render(item)
}

function render(item) {
  const ul = document.querySelector('#data')

  const li = document.createElement('li')
  li.textContent = item

  ul.appendChild(li)

  document.title = clickArray.length
}