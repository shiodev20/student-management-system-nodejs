const { MarkType } = require('../models')
const customError = require('../utils/customError')

function markTypeService() {

	const getMarkTypeList = async () => {
		try {
			const result = await MarkType.findAll()
			return result

		} catch (err) {
			throw customError()
		}
	}

	return {
		getMarkTypeList
	}
}

module.exports = markTypeService
