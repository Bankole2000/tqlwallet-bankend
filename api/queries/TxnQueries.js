const DataStore = require('../data/dataStore');
const { PrismaClient } = require("@prisma/client");

const dataStore = new DataStore();
const prisma = new PrismaClient();

const txnQueries = {
  async getAllTxns() {
    return await dataStore.getAll('transaction')
  },
  async getUserTxns(data) {
    try {
      const userTxns = await prisma.transaction.findMany({
        where: { actorUuid: data },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return { data: userTxns, error: null };
    } catch (error) {
      return { data: null, error }
    }
  },
  async getStatement(data) {
    try {
      const result = await prisma.transaction.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: new Date(data.start),
                lte: new Date(data.end)
              }
            }, {
              actorUuid: data.actorUuid
            }
          ]
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      return { data: result, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
}

module.exports = txnQueries;