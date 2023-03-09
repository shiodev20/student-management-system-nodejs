
const generateStudentId = (id) => {

  const text = id.slice(0, 2)
  const number = Number(id.slice(2))

  return `${text}${number + 1}`
}

const generateClassroomId = (year, classroomName) => {
  const customYear = year.slice(2)

  return `${classroomName}${customYear}`
}

const generateAccountId = (id) => {
  const text = id.slice(0, 2)
  const number = Number(id.slice(2))

  return `${text}${number + 1}`
}

module.exports = {
  generateStudentId,
  generateAccountId,
  generateClassroomId,
}
