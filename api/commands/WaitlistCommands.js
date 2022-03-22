const DataStore = require('../data/dataStore');

const dataStore = new DataStore();

const waitlistCommands = {
  async addEmailToNodbankWaitlist(data) {
    const { email } = data;
    const { data: foundEmail, error: foundError } = await dataStore.findUnique('nodbankWaitlist', 'email', email);
    console.log({ foundEmail, foundError });

    if (foundEmail) {
      return { data: null, error: 'Email is already in waitlist' };
    }
    try {
      return await dataStore.create('nodbankWaitlist', data);
    } catch (error) {
      console.log({ error });
      return { data: null, error: 'Email Already added to waitlist' };
    }
  },

  async deleteFromNodbankWaitlist(data) {
    const { id } = data;
    const { data: foundEmail } = await dataStore.findUnique('nodbankWaitlist', 'id', id);
    if (foundEmail) {
      return await dataStore.delete('nodbankWaitlist', data);
    }
    return { data: null, error: 'No Email with that ID found in waitlist' };
  },
};

module.exports = waitlistCommands;
