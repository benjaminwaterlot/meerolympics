const admin = require('firebase-admin')
const { updatePlayers } = require('./src/updatePlayers')
const { computeEmployees } = require('./src/computeEmployees')
const { helloWorld } = require('./src/helloWorld')
// const { addBabyfoot } = require('./src/addBabyfoot')
const { recordMatch } = require('./src/recordMatch')

admin.initializeApp()

exports.updatePlayers = updatePlayers
exports.computeEmployees = computeEmployees
exports.helloWorld = helloWorld
// exports.addBabyfoot = addBabyfoot
exports.recordMatch = recordMatch
