
const generateId = (id) => {

  const text = id.slice(0, 2)
  const number = Number(id.slice(2))

  return `${text}${number + 1}`
}

module.exports = generateId
