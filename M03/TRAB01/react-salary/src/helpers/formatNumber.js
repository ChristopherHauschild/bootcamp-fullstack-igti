function formatNumber(number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(number)

  return formatter
}

export { formatNumber }