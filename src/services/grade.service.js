const { Grade } = require('../models')
const customError = require('../utils/customError')

function gradeService() {

	const getGradeList = async () => {
		try {
			const result = await Grade.findAll()
			return result

		} catch (error) {
			throw customError()
		}
	}

	return {
		getGradeList
	}
}

module.exports = gradeService
