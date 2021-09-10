const EventStore = require('../data/eventStore');
const eventStore = new EventStore();
const queries = require('../queries');
const commands = require("../commands");
const events = require("../events");

module.exports.getUserActivity = async (req, res) => {
  let recentActivity = [], archivedActivity = [], userActivity = [], allActivity;
  try {
    recentActivity = await eventStore.getEvents()
  } catch (error) {
    console.log({ error });
  }
  if (req.query.from) {
    const from = req.query.from;
    const lastBackup = Date.parse(new Date()) - (7 * 86400000);
    if (Date.parse(from) <= lastBackup) {
      const { data, error } = await queries.systemQueries.getArchivedEvents(from);
      if (error) {
        return res.status(500).json({ message: "Error retrieving Archived Activities", error, data });
      }
      archivedActivity = data;
    }

    allActivity = [...recentActivity, ...archivedActivity]
    allActivity = allActivity.filter((activity) => Date.parse(activity.timestamp) >= Date.parse(from))
    if (req.query.to) {
      const to = req.query.to;
      allActivity = allActivity.filter((activity) => Date.parse(activity.timestamp) <= Date.parse(to))
    }
  } else {
    allActivity = [...recentActivity]
  }
  if (allActivity.length) {
    userActivity = allActivity.filter(log => log.id == req.user.id || log.data?.actorUuid == req.user.id)

    userActivity = userActivity.sort((a, b) => {
      return Date.parse(a.timestamp) - Date.parse(b.timestamp)
    })
    userActivity.forEach((activity) => {
      if (activity.data) {
        delete activity.data.password
        delete activity.data.userToken
      }
    })
  }
  return res.status(200).json({ message: "User Activity", data: userActivity, error: null })
}

module.exports.verifyToken = async (req, res) => {
  if (req.user) {
    res.json({ message: "User Verified", error: null, data: req.user })
  } else {
    res.json({ message: "User Unverified", error: "User is Unverified", data: req.user })
  }
}

module.exports.login = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  await events.userEvents.loginAttempt(req.body, ip);
  const { email, password } = req.body;
  const { data, error } = await commands.userCommands.authenticateUser('email', email, password);
  if (!error) {
    await events.userEvents.loginSuccess(data, ip);
    return res.json({ message: "login successful", error, data })
  } else {
    await events.userEvents.loginFailed(req.body, ip);
    return res.json({ message: "Invalid Credentials", error, data: null })
  }
}

module.exports.signup = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  events.userEvents.signupAttempt(req.body, ip);
  const { email, password } = req.body;
  const { data, error } = await commands.userCommands.createUser({ email, password })

  if (!error) {
    await events.userEvents.userCreated(data, ip, error);
    await events.userEvents.signupSuccess(data, ip, error);
    return res.json({ message: "Signup successful", error, data })
  } else {
    events.userEvents.signupFailed(data, ip, error);
    return res.json({ message: "Signup failed", error, data })
  }
}

module.exports.updateProfile = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  updateData = { ...req.body, id: req.user.id };
  await events.userEvents.profileUpdateAttempt(updateData, ip);
  const { data, error } = await commands.userCommands.updateUser(updateData);

  if (!error) {
    await events.userEvents.profileUpdated(updateData, ip, error);
    res.status(201).json({ message: "Profile Update success", data, error })
  } else {
    await events.userEvents.profileUpdateFailed(updateData, ip, error);
    res.status(400).json({ message: "profile update failed", data, error })
  }
}