const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const asyncRedis = require('async-redis');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redisClient = asyncRedis.createClient(redisUrl);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  store: new RedisStore({
    client: redisClient,
  }),
  max: 120,
  message:
    'Too many requests from this IP, please try again after 1 minute',
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

const { systemController, txnController, userController } = require('./api/controllers');
const { requireUserAuth, checkUserVerification } = require('./api/middleware/auth');

// Daily backup of event logs older than 1 week
cron.schedule('59 59 23 * * *', systemController.archiveEvents);

app.get('/', systemController.getLogs);

app.get('/activity', requireUserAuth, checkUserVerification, userController.getUserActivity);

app.post('/login', apiLimiter, userController.login);

app.post('/signup', apiLimiter, userController.signup);

app.post('/update-profile', apiLimiter, requireUserAuth, userController.updateProfile);

app.get('/verify-token', requireUserAuth, checkUserVerification, userController.verifyToken);

app.post('/transactions', requireUserAuth, checkUserVerification, txnController.createTransaction);

app.get('/transactions', requireUserAuth, checkUserVerification, txnController.getTransactions);

app.get('/balance', async (req, res) => {
  // WIP - Should return aggregate
  console.log({ test: 'Minor change' });
  res.json({ message: 'Get User Balance' });
});

app.get('/statement', requireUserAuth, checkUserVerification, txnController.getBankStatement);

app.post('/print-statement', apiLimiter, requireUserAuth, checkUserVerification, txnController.generateStatementPDF);

app.get('/print-statement', requireUserAuth, checkUserVerification, txnController.getPrintedStatementPDF);

app.post('/nodtransfer', txnController.generateNodTransferPDF);

app.get('/nodtransfer', txnController.sendNodTransferPDF);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
