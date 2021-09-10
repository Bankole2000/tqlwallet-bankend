const EventStore = require('../data/eventStore');
const commands = require("../commands");
const events = require("../events");
const eventStore = new EventStore();

module.exports.archiveEvents = async () => {
  const backupTime = Date.parse(new Date()) - (7 * 86400000); // 7 days in the past
  const logs = await eventStore.getEvents()
  const dataForBackup = logs.filter(log => Date.parse(log.timestamp) <= backupTime);
  const { error } = await commands.systemCommands.backupEventStore(dataForBackup);
  console.log({ error });
  if (!error) {
    const currentLogs = logs.filter(log => Date.parse(log.timestamp) > backupTime);
    await events.systemEvents.updateEventStore(currentLogs);
  }
}

module.exports.getLogs = async (req, res) => {
  const logs = await eventStore.getEvents()
  logs.forEach(log => {
    if (log.data) {
      if (log.data.password) {
        delete log.data.password
      }
      if (log.data.userToken) {
        delete log.data.userToken
      }
    }
  });
  return res.json({ message: "Server is running", logs })
}
