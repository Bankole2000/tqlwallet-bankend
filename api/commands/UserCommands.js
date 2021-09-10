const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DataStore = require('../data/dataStore');

const dataStore = new DataStore()

const maxAge = 3 * 24 * 60 * 60; // jwt uses time in seconds NOT millisends

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const userCommands = {
  async createUser(data) {
    const { data: user, error } = await dataStore.findUnique('user', 'email', data.email);
    if (user) {
      return { data: null, error: "Email is already taken", err: error };
    }
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      return dataStore.create('user', data);
    } catch (error) {
      return { data, error };
    }
  },
  async authenticateUser(key, value, password) {
    const { data, error } = await dataStore.findUnique('user', key, value);
    if (error) {
      return { data, error };
    }
    const auth = bcrypt.compareSync(password, data.password); //returns a boolean
    if (!auth) {
      return { data, error: "Incorrect Login Credentials" }
    }
    const userToken = createToken(data);
    data.userToken = userToken;
    return { data, error: null };
  },
  async updateUser(data) {
    // console.log({ data });
    try {
      return await dataStore.update('user', data)
    } catch (error) {
      return { data, error };
    }
  }
}

module.exports = userCommands