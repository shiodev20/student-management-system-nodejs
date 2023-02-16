const { Grade } = require('../models')

function gradeService() {

	const getGradeList = async () => {
		try {
			const result = await Grade.findAll()
			return result

		} catch (err) {
			throw new Error('Lỗi hệ thống')
		}
	}

	return {
		getGradeList
	}
}

module.exports = gradeService
