const { v4: uuidv4 } = require('uuid');

class AppEvent {
  constructor(model = "",
    id = "",
    type,
    name,
    data = {}, ip = null, error = null) {
    this.model = model;
    this.id = id;
    this.type = type;
    this.name = name;
    this.data = data;
    this.error = error;
    this.ip = ip;
    this.timestamp = new Date(Date.now()).toISOString();
    this.eventId = uuidv4();
  }
}

module.exports = AppEvent