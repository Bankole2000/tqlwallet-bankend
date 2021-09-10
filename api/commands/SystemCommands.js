const DataStore = require('../data/dataStore');

const dataStore = new DataStore()

const systemCommands = {
  async backupEventStore(data) {
    try {
      return await dataStore.createMany('event', data)
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = systemCommands;