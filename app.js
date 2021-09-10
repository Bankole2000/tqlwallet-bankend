

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const commands = require("./api/commands");
const queries = require("./api/queries");
const events = require("./api/events");
const EventStore = require('./api/data/eventStore');
const { requireUserAuth, checkUserVerification } = require('./api/middleware/auth');
const eventStore = new EventStore();


app.get("/", async (req, res) => {
  const logs = await eventStore.getEvents()
  res.json({ message: "Server is running", logs })
})

app.post("/login", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  events.userEvents.loginAttempt(req.body, ip);
  const { email, password } = req.body;
  const { data, error } = await commands.userCommands.authenticateUser('email', email, password);
  if (!error) {
    events.userEvents.loginSuccess(data, ip);
    return res.json({ message: "login successful", error, data })
  } else {
    events.userEvents.loginFailed(req.body, ip);
    return res.json({ message: "Invalid Credentials", error, data: null })
  }
})

app.get("/activity", requireUserAuth, checkUserVerification, async (req, res) => {
  const logs = await eventStore.getEvents()
  const userActivity = logs.filter(log => log.id == req.user.id || log.data?.actorUuid == req.user.id)
  res.status(200).json({ message: "User Activity", data: userActivity, error: null })
})

app.get("/verify-token", requireUserAuth, checkUserVerification, async (req, res) => {
  if (req.user) {
    res.json({ message: "User Verified", error: null, data: req.user })
  } else {
    res.json({ message: "User Unverified", error: "User is Unverified", data: req.user })
  }
})

app.post("/signup", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  events.userEvents.signupAttempt(req.body, ip);
  const { email, password } = req.body;
  const { data, error } = await commands.userCommands.createUser({ email, password })
  // console.log({ data, error });
  if (!error) {
    await events.userEvents.userCreated(data, ip, error);
    await events.userEvents.signupSuccess(data, ip, error);
    return res.json({ message: "Signup successful", error, data })
  } else {
    events.userEvents.signupFailed(data, ip, error);
    return res.json({ message: "Signup failed", error, data })
  }
})

app.post("/update-profile", requireUserAuth, async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  updateData = { ...req.body, id: req.user.id };
  events.userEvents.profileUpdateAttempt(updateData, ip);
  const { data, error } = await commands.userCommands.updateUser(updateData);
  // console.log(data, error);
  if (error) {
    events.userEvents.profileUpdateFailed(updateData, ip, error);
    res.status(400).json({ message: "profile update failed", data, error })
  } else {
    events.userEvents.profileUpdated(updateData, ip, error);
    res.status(201).json({ message: "Profile Update success", data, error })
  }
})

app.post("/transactions", requireUserAuth, checkUserVerification, async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  const txnData = req.body;
  txnData.amount = Number(txnData.amount);
  txnData.type = Number(txnData.amount) < 0 ? "Debit" : "Credit";
  txnData.actorUuid = req.user.id;
  events.txnEvents.txnAttempt(txnData, ip);
  // console.log({ txnData });
  const { data, error } = await commands.txnCommands.createTxn(txnData);
  // console.log({ data, error });
  if (!error) {
    await events.txnEvents.txnSuccess(req.body, ip, error);
    await events.txnEvents.txnCreated(data, ip, error)
    return res.status(201).json({ message: "New Transaction Successful", data, error })
  } else {
    events.txnEvents.txnFailed(data, ip, error);
    res.status(400).json({ message: "Transaction failed", data, error: error })
  }
})

app.get("/transactions", requireUserAuth, checkUserVerification, async (req, res) => {
  const userId = req.user.id
  console.log({ userId });
  const { data, error } = await queries.txnQueries.getUserTxns(userId)
  if (!error) {
    res.status(200).json({ message: "User Transactions", data, error })
  } else {
    res.status(500).json({ message: "Something went wrong", data, error })
  }
})

app.get("/balance", async (req, res) => {

  res.json({ message: "Get User Balance" })
})

app.get("/statement", requireUserAuth, checkUserVerification, async (req, res) => {
  const { query: queryData } = req;
  queryData.actorUuid = req.user.id;
  console.log({ userId: req.user.id });
  // queryData.end = queryData.end || new Date().toISOString().slice(0, 10).toString();
  queryData.end = queryData.end || Date.now();
  // console.log({ queryData });
  const { data, error } = await queries.txnQueries.getStatement(queryData)
  if (!error) {
    res.status(200).json({ message: "User Bank Statement by month", data, error })
  } else {
    console.log({ data, error });
    res.status(500).json({ message: "There was an error", data, error })
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
