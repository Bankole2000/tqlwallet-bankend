const EventStore = require('../data/eventStore');

const eventStore = new EventStore();

const systemEvents = {
  async updateEventStore(data) {
    await eventStore.setEvents(data);
  }
}

module.exports = systemEvents;