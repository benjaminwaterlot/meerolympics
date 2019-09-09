const admin = require('firebase-admin')
const { updatePlayers } = require('./src/updatePlayers')
const { computeEmployees } = require('./src/computeEmployees')
const { helloWorld } = require('./src/helloWorld')

admin.initializeApp()

exports.updatePlayers = updatePlayers
exports.computeEmployees = computeEmployees
exports.helloWorld = helloWorld
