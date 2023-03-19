const { Rank } = require('../models')
const customError = require('../utils/customError')

const getRankList = async () => {
  try {
    const result = await Rank.findAll()

    return result

  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

const getRankByMark = async (mark) => {
  try {
    let result = ''
    
    const ranks = await getRankList()

    ranks.forEach(rank => {
      if(mark >= rank.minValue && mark <= rank.maxValue) {
        result = rank.name
        return
      }
    })

    return result
  } catch (error) {
    if(error.code != 0) throw error
    throw customError()
  }
}

exports.getRankList = getRankList
exports.getRankByMark = getRankByMark
