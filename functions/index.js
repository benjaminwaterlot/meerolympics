const admin = require('firebase-admin')
const { computePlayers } = require('./computePlayers')
const { updatePlayers } = require('./updatePlayers')

admin.initializeApp()

exports.computePlayers = computePlayers
exports.updatePlayers = updatePlayers
