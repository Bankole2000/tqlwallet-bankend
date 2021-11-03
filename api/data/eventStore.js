const asyncRedis = require('async-redis');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redisClient = asyncRedis.createClient(redisUrl);

redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

class EventStore {
  async createEvent(data) {
    console.log(`\n${data.name}`);
    console.log('===========================');
    try {
      const oldevents = await redisClient.get('events');
      const events = JSON.parse(oldevents || '[]');
      events.push(data);
      await redisClient.set('events', JSON.stringify(events));
    } catch (e) {
      console.log({ e });
    }
  }

  async getEvents() {
    let events;
    try {
      events = await redisClient.get('events');
    } catch (e) {
      console.log({ e });
    }
    return JSON.parse(events || '[]');
  }

  async setEvents(data) {
    try {
      await redisClient.set('events', JSON.stringify(data));
      return { data, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error };
    }
  }
}

module.exports = EventStore;
