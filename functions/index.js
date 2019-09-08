const admin = require('firebase-admin')
const { updatePlayers } = require('./src/updatePlayers')
const { computeEmployees } = require('./src/computeEmployees')

admin.initializeApp()

exports.updatePlayers = updatePlayers
exports.computeEmployees = computeEmployees
