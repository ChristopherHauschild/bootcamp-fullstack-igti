function formatNumber(number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(number)

  return formatter
}

function formatPercentage(number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(number)
  
  return formatter + '%'
}

export { formatNumber, formatPercentage }