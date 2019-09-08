const admin = require('firebase-admin')
const { updatePlayers } = require('./src/updatePlayers')
const { computePlayers } = require('./src/computePlayers')

admin.initializeApp()

exports.updatePlayers = updatePlayers
exports.computePlayers = computePlayers
