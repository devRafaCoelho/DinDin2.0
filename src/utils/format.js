const formatedDate = (date) => {
  return date ? new Date(date).toISOString().slice(0, 10) : null
}

const formatedValue = (value) => {
  return value
    ? (value / 100).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    : 'R$ 0,00'
}

module.exports = {
  formatedDate,
  formatedValue
}
