const queries = require('../queries');
const commands = require("../commands");
const events = require("../events");

module.exports.getTransactions = async (req, res) => {
  const userId = req.user.id
  const { data, error } = await queries.txnQueries.getUserTxns(userId)
  if (!error) {
    return res.status(200).json({ message: "User Transactions", data, error })
  } else {
    return res.status(500).json({ message: "Something went wrong", data, error })
  }
}

module.exports.createTransaction = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  const txnData = req.body;
  txnData.amount = Number(txnData.amount);
  txnData.type = Number(txnData.amount) < 0 ? "Debit" : "Credit";
  txnData.actorUuid = req.user.id;
  await events.txnEvents.txnAttempt(txnData, ip);

  const { data, error } = await commands.txnCommands.createTxn(txnData);

  if (!error) {
    await events.txnEvents.txnSuccess(req.body, ip, error);
    await events.txnEvents.txnCreated(data, ip, error)
    return res.status(201).json({ message: "New Transaction Successful", data, error })
  } else {
    await events.txnEvents.txnFailed(data, ip, error);
    return res.status(400).json({ message: "Transaction failed", data, error: error })
  }
}

module.exports.getBankStatement = async (req, res) => {
  const { query: queryData } = req;
  queryData.actorUuid = req.user.id;
  console.log({ userId: req.user.id });
  // queryData.end = queryData.end || new Date().toISOString().slice(0, 10).toString();
  queryData.end = queryData.end || Date.now();

  const { data, error } = await queries.txnQueries.getStatement(queryData)
  if (!error) {
    res.status(200).json({ message: "User Bank Statement by month", data, error })
  } else {
    console.log({ data, error });
    res.status(500).json({ message: "There was an error", data, error })
  }
}