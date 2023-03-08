const { MarkType } = require('../models')
const customError = require('../utils/customError')

const getMarkTypeList = async () => {
	try {
		const result = await MarkType.findAll()
		return result

	} catch (err) {
		if(error.code != 0) throw error
		throw customError()
	}
}

exports.getMarkTypeList = getMarkTypeList
