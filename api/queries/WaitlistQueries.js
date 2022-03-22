const DataStore = require('../data/dataStore');

const dataStore = new DataStore();

const waitlistQueries = {
  async getAllNodbankWaitlist() {
    return await dataStore.getAll('nodbankWaitlist');
  },
};

module.exports = waitlistQueries;
