const Ajv = require('ajv')
const MATCH = require('../schemas/match.json')

const ajv = new Ajv()

const SCHEMAS = {
  match: MATCH
}

module.exports = (data, schemaName) => {
  const schema = SCHEMAS[schemaName]
  if (!schema) throw new Error(`Unknown schema ${schemaName}`)

  const details = ajv.compile(schema)
  const valid = details(data)
  return { valid, details }
}