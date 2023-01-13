const express = require('express')
const db = require('./models')
const { Op, QueryTypes } = require('sequelize')

const app = express()


app.listen(3000, () => {
  console.log('app is running');
})
