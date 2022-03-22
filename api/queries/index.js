const userQueries = require('./UserQueries');
const txnQueries = require('./TxnQueries');
const systemQueries = require('./SystemQueries');
// eslint-disable-next-line import/no-unresolved
const waitlistQueries = require('./WaitlistQueries');

module.exports = {
  userQueries,
  txnQueries,
  systemQueries,
  waitlistQueries,
};
