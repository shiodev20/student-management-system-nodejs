const { Grade } = require('../models')
const customError = require('../utils/customError')

const getGradeList = async () => {
	try {
		const result = await Grade.findAll()
		return result

	} catch (error) {
		if(error.code != 0) throw error
		throw customError()
	}
}

exports.getGradeList = getGradeList
