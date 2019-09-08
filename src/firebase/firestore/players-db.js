import GenericDB from './generic-db'

export default class PlayersDB extends GenericDB {
  constructor() {
    super(`players`)
  }

  // Here you can extend PlayersDB with custom methods
}
