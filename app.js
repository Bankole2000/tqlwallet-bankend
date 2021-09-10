const express = require("express");
const cors = require("cors");
const cron = require('node-cron');

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

const { systemController, txnController, userController } = require("./api/controllers");
const { requireUserAuth, checkUserVerification } = require('./api/middleware/auth');

// Daily backup of event logs older than 1 week
cron.schedule('59 59 23 * * *', systemController.archiveEvents)

app.get("/", systemController.getLogs)

app.get("/activity", requireUserAuth, checkUserVerification, userController.getUserActivity)

app.post("/login", userController.login)

app.post("/signup", userController.signup)

app.post("/update-profile", requireUserAuth, userController.updateProfile)

app.get("/verify-token", requireUserAuth, checkUserVerification, userController.verifyToken)

app.post("/transactions", requireUserAuth, checkUserVerification, txnController.createTransaction)

app.get("/transactions", requireUserAuth, checkUserVerification, txnController.getTransactions)

app.get("/balance", async (req, res) => {
  // WIP - Should return aggregate
  res.json({ message: "Get User Balance" })
})

app.get("/statement", requireUserAuth, checkUserVerification, txnController.getBankStatement)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
