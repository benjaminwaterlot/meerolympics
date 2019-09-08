import GenericDB from './generic-db'

export default class MatchesDB extends GenericDB {
  constructor() {
    super(`matches`)
  }
}
