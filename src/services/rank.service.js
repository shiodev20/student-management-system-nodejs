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

exports.getRankList = getRankList
