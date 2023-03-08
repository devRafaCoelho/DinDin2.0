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

const formatedValueInputBRL = (value) => {
  if (value) {
    while (value.length < 3) {
      value = '0' + value
    }

    const integerPart = value.slice(0, -2)
    const decimalPart = value.slice(-2)

    const formatedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart

    return formatedNumber
  } else {
    return null
  }
}

const formatedCountValue = (value) => {
  return value.toString().padStart(2, '0')
}

const formatedCpf = (cpf) => {
  return cpf ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') : null
}

const formatedPhone = (phone) => {
  return phone ? phone.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2 $3-$4') : null
}

const formatedZipCode = (zipCode) => {
  return zipCode ? zipCode.replace(/^(\d{5})(\d{3})$/, '$1-$2') : null
}

module.exports = {
  formatedDate,
  formatedValue,
  formatedValueInputBRL,
  formatedCountValue,
  formatedCpf,
  formatedPhone,
  formatedZipCode
}
