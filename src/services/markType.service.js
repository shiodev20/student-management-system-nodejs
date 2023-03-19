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

const getMarkTypeById = async (id) => {
	try {
		const result = await MarkType.findByPk(id)

		return result

	} catch (error) {
		if(error.code != 0) throw error
		throw customError()
	}
}

const updateMarkTypes = async (markTypes) => {
	try {
		const result = await Promise.all(markTypes.map(async markType => {
			const updateMarkType = await getMarkTypeById(markType.id)

			await updateMarkType.update({
				name: markType.name,
				coefficient: markType.coefficient
			})

		}))

		return result

	} catch (error) {
		if(error.code != 0) throw error
		throw customError()
	}
}

exports.getMarkTypeList = getMarkTypeList
exports.getMarkTypeById = getMarkTypeById
exports.updateMarkTypes = updateMarkTypes

