const { waitlistCommands } = require('../commands');
const { waitlistQueries } = require('../queries');
const { isEmail } = require('../services/helpers/validators');

module.exports.addEmailToWaitlist = async (req, res) => {
  const { email } = req.body;
  if (!email || !isEmail(email)) {
    return res.status(400).json({ message: 'Invalid Email', error: 'Invalid Email', data: null });
  }

  const { data, error } = await waitlistCommands.addEmailToNodbankWaitlist({ email });
  if (error) {
    return res.status(400).json({
      message: 'Email already in waitlist',
      error,
      data,
    });
  }
  return res.status(201).json({
    message: 'Email added to waitlist',
    error,
    data,
  });
};

module.exports.getNodbankWaitlist = async (req, res) => {
  const { data, error } = await waitlistQueries.getAllNodbankWaitlist();
  console.log({ data, error });
  if (error) {
    return res.status(500).json({
      message: 'Error getting waitlist',
      error,
      data,
    });
  }
  return res.status(200).json({
    message: 'Retried Nodbank waitlist',
    data,
    error,
  });
};

module.exports.deleteFromNodbankWaitlist = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await waitlistCommands.deleteFromNodbankWaitlist({ id });
  if (error) {
    return res.status(400).json({ message: 'Error Deleting Email from Waitlis', error, data });
  }
  return res.status(200).json({ message: 'Email Deleted from Waitlist', data, error });
};
