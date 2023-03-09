
const generateClassroomId = (year, classroomName) => {
  const customYear = year.slice(2)

  return `${classroomName}${customYear}`
}

const generateId = (prefix = '', length = 6) => {
  const id = (Date.now() * Math.floor(Math.random() * 1000)).toString().slice(-length)

  return prefix + id
}

module.exports = {
  generateId,
  generateClassroomId,
}
