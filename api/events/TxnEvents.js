const EventStore = require('../data/eventStore');
const AppEvent = require('./AppEvent');
const eventStore = new EventStore();

const txnEvents = {
  async txnCreated(data, ip, error = null) {
    const { id } = data;
    delete data.id;
    const event = new AppEvent("transaction", id, "create", "Trasanction Created", data, ip, error)
    await eventStore.createEvent(event);
  },
  async txnAttempt(data, ip, error = null) {
    const event = new AppEvent("transaction", "", "log", "Trasanction Attempted", data, ip, error)
    await eventStore.createEvent(event);
  },
  async txnFailed(data, ip, error = null) {
    const event = new AppEvent("transaction", "", "log", "Transaction Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
  async txnSuccess(data, ip, error = null) {
    const { id } = data;
    const event = new AppEvent("transaction", id, "log", "Trasanction Successful", data, ip, error)
    await eventStore.createEvent(event);
  },
}

module.exports = txnEvents
