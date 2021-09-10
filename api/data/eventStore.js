const asyncRedis = require("async-redis");
const redisClient = asyncRedis.createClient();

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

class EventStore {
  async createEvent(data) {
    console.log(`\n${data.name}`);
    console.log("===========================");
    try {
      const oldevents = await redisClient.get('events')
      const events = JSON.parse(oldevents ? oldevents : "[]");
      events.push(data);
      await redisClient.set('events', JSON.stringify(events));
    } catch (e) {
      console.log({ e });
    }
  }

  async getEvents() {
    try {
      const events = await redisClient.get('events');
      return JSON.parse(events ? events : "[]");
    } catch (e) {
      console.log({ e });
    }
  }
}

module.exports = EventStore