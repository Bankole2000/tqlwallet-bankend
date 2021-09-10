const EventStore = require('../data/eventStore');
const AppEvent = require('./AppEvent');
const eventStore = new EventStore();

const userEvents = {
  async userCreated(data, ip, error = null) {
    const { id } = data;
    delete data.id;
    const event = new AppEvent("user", id, "create", "User Created", data, ip, error)
    await eventStore.createEvent(event);
  },
  async signupAttempt(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Signup Attempted", data, ip, error)
    await eventStore.createEvent(event);
  },
  async loginAttempt(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Login Attempted", data, ip, error)
    await eventStore.createEvent(event);
  },
  async loginFailed(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Login Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
  async authFailed(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Authentication Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
  async authSuccess(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Authentication Succeeded", data, ip, error)
    await eventStore.createEvent(event);
  },
  async verifyAttempt(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Verification Attempt", data, ip, error)
    await eventStore.createEvent(event);
  },
  async verifySuccess(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Verification Succeeded", data, ip, error)
    await eventStore.createEvent(event);
  },
  async verifyFailed(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Verification Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
  async authAttempt(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Authentication Attempt", data, ip, error)
    await eventStore.createEvent(event);
  },
  async loginSuccess(data, ip, error = null) {
    const { id } = data;
    const event = new AppEvent("user", id, "log", "Login Successful", data, ip, error)
    await eventStore.createEvent(event);
  },
  async signupSuccess(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Signup Successful", data, ip, error)
    await eventStore.createEvent(event);
  },
  async signupFailed(data, ip, error = null) {
    const event = new AppEvent("user", "", "log", "Signup Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
  async profileUpdateAttempt(data, ip, error = null) {
    const { id } = data;
    const event = new AppEvent("user", id, "log", "Profile Update Attempt", data, ip, error)
    await eventStore.createEvent(event);
  },
  async profileUpdated(data, ip, error = null) {
    const { id } = data;
    const event = new AppEvent("user", id, "update", "Profile Update Successful", data, ip, error)
    await eventStore.createEvent(event);
  },
  async profileUpdateFailed(data, ip, error = null) {
    const { id } = data;
    const event = new AppEvent("user", id, "update", "Profile Update Failed", data, ip, error)
    await eventStore.createEvent(event);
  },
}

module.exports = userEvents