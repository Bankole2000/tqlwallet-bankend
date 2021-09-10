const jwt = require('jsonwebtoken');
const events = require("../events/index");
const DataStore = require("../data/dataStore");
const dataStore = new DataStore();

const requireUserAuth = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  events.userEvents.authAttempt(req.body, ip);
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      if (token) {
        jwt.verify(token, process.env.SECRET, async (err, tokenData) => {
          if (err) {
            events.userEvents.authFailed(tokenData, ip, err)
            res.status(401).json({ message: "Unauthenticated", error: err, data: null });
          } else {
            const { data, error } = await dataStore.findUnique('user', "id", tokenData.user.id)
            if (error) {
              await events.userEvents.authFailed(req.body, ip, "Invalid Token - User not found")
              res.status(401).json({ message: "Unauthenticated", error: "Invalid Token - User not found", data: null });
            }
            req.user = data;
            events.userEvents.authSuccess(data, ip, err)
            next();
          }
        });
      } else {
        await events.userEvents.authFailed(req.body, ip, "Unauthenticated - No token in header")
        res.status(401).json({ message: "Unauthenticated", error: "Unauthenticated - No token in header", data: null });
      }
    } else {
      await events.userEvents.authFailed(req.body, ip, "Unauthenticated - No Authorization in header")
      res.status(401).json({ message: "Unauthenticated", error: "Unauthenticated - No Authorization in header", data: null });
    }
  } catch (err) {
    await events.userEvents.authFailed(req.body, ip, err)
    res.status(401).json({ message: "Unauthenticated", error: err, data: req.body });
  }
};

const checkUserVerification = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  events.userEvents.verifyAttempt(req.user, ip);
  try {
    if (req.user) {
      let user = req.user
      if (!user.gender || !user.firstname || !user.lastname || !user.country || !user.state || !user.city || !user.address || !user.bvn || !user.bank || !user.accountNo) {
        events.userEvents.verifyFailed(user, ip, "Incomplete Profile")
        res.status(403).json({ message: "Unverified", error: "Unverified - Incomplete Profile", data: user });
      } else {
        events.userEvents.verifySuccess(user, ip);
        next();
      }
    } else {
      await events.userEvents.authFailed(req.body, ip, "Unauthenticated - No Authorization in header")
      res.status(401).json({ message: "Unauthenticated", error: "Unauthenticated - No Authorization in header", data: null });
    }
  } catch (err) {
    await events.userEvents.authFailed(req.body, ip, err)
    res.status(401).json({ message: "Unauthenticated", error: err, data: req.body });
  }
};


module.exports = { requireUserAuth, checkUserVerification };
