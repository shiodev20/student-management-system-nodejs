const router = require('express').Router()

const markController = require('../controllers/mark.controller')

const { getMarkAdd, postMarkAdd } = markController()

router.get('/nhap-diem/:id', getMarkAdd)

router.post('/nhap-diem', postMarkAdd)

module.exports = router
